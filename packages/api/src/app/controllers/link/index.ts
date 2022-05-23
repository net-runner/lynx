import log from '../../helpers/logger';
import { pushDiscordWebhook } from '../../helpers/pushDiscordWebhook';
import {
  validateLinkAdd,
  validateLinkEdit,
} from '../../helpers/dataValidation';
import {
  createLink,
  deleteLinkFromDatabase,
  editLinkInDatabase,
  getLinkFromDatabase,
  getLinksFromDatabase,
} from '../../services/link';
import {
  authorizedRouteHandler,
  ControllerMethodTypes,
  defaultRouteHandler,
} from '../../../interfaces';
import { Request } from 'hyper-express';
import redisClient from '../../lib/redis';

class LinkController {
  protected validateAndDestructureBody = async (
    req: Request,
    userId: string,
    actionType: ControllerMethodTypes
  ) => {
    const body = await req.json();
    const { id, link, privacyLevel, description, group, stars } = body;
    const lynxLink = {
      id,
      link,
      privacyLevel,
      owner: userId,
      description,
      group,
      stars,
    };
    log.info(id, link);
    let isLinkValidated;
    if (actionType === ControllerMethodTypes.ADD)
      isLinkValidated = await validateLinkAdd(lynxLink);
    if (actionType === ControllerMethodTypes.EDIT)
      isLinkValidated = await validateLinkEdit(lynxLink);
    if (!isLinkValidated) return false;
    return lynxLink;
  };
  public add: authorizedRouteHandler = async (req, res) => {
    try {
      const user = res.locals.id.user;
      const lynxLink = await this.validateAndDestructureBody(
        req,
        user,
        ControllerMethodTypes.ADD
      );
      if (!lynxLink) return res.status(400).end();

      const createdLink = await createLink(lynxLink);
      if (!createdLink) return res.status(500).end();

      const discordWebhookBody = {
        title: `New link added: ${lynxLink.link}`,
        description: `from user ${user}`,
      };
      pushDiscordWebhook(discordWebhookBody);

      res.status(200).json(createdLink);
    } catch (e) {
      log.error({ err: e.message, desc: e });
      res.json({ err: e.message, desc: e });
    }
  };
  public edit: authorizedRouteHandler = async (req, res) => {
    try {
      const user = res.locals.id.user;
      const lynxLink = await this.validateAndDestructureBody(
        req,
        user,
        ControllerMethodTypes.EDIT
      );
      if (!lynxLink) return res.status(400).end();

      const editedLink = await editLinkInDatabase(lynxLink, lynxLink.id);
      if (!editedLink) return res.status(500).end();

      const discordWebhookBody = {
        title: `Link has been edited`,
        description: `link id: ${lynxLink.id}`,
      };
      pushDiscordWebhook(discordWebhookBody);
      res.status(200).json(editedLink);
    } catch (e) {
      log.error({ err: e.message, desc: e });
      res.json({ err: e.message, desc: e });
    }
  };
  public delete: defaultRouteHandler = async (req, res) => {
    try {
      const body = await req.json();
      const { id } = body;
      log.info(id);

      const isLinkRemoved = await deleteLinkFromDatabase(id);
      if (!isLinkRemoved) return res.status(404).end();

      const discordWebhookBody = {
        title: `Link has been removed from db`,
        description: `link id: ${id}`,
      };
      pushDiscordWebhook(discordWebhookBody);

      res.status(200).end();
    } catch (e) {
      log.error({ err: e.message, desc: e });
      res.json({ err: e.message, desc: e });
    }
  };
  public getSingle: defaultRouteHandler = async (req, res) => {
    try {
      const body = await req.json();
      const { id } = body;
      log.info(id);

      const linkFromDb = await getLinkFromDatabase(id);
      if (!linkFromDb) return res.status(404).end();

      //Save record to redis
      const key = req.originalUrl;
      redisClient.setex(key, 3600, JSON.stringify(linkFromDb));

      const discordWebhookBody = {
        title: `GET link from db: ${linkFromDb.link}`,
        description: `link id: ${id}`,
      };
      pushDiscordWebhook(discordWebhookBody);

      res.status(200).json(linkFromDb);
    } catch (e) {
      log.error({ err: e.message, desc: e });
      res.json({ err: e.message, desc: e });
    }
  };
  public getMany: defaultRouteHandler = async (req, res) => {
    try {
      const body = await req.json();
      const { limit } = body;
      let { page } = body;

      if (limit > 50) return res.status(400).send('Limit exceeded');
      if (page === undefined) page = 0;
      if (typeof limit !== 'number' || typeof page !== 'number')
        return res.status(400).send('Limit and page have to be numbers');

      const linksFromDb = await getLinksFromDatabase(limit, page);

      //Save db req to redis
      const key = req.originalUrl;
      redisClient.setex(key, 3600, JSON.stringify(linksFromDb));

      const discordWebhookBody = {
        title: `GET links array from db, limit: ${limit}, page: ${page}`,
        description: `---`,
      };
      pushDiscordWebhook(discordWebhookBody);

      const linksResponse = linksFromDb.map((linkFromDb) => linkFromDb);
      res.status(200).json(linksResponse);
    } catch (e) {
      log.error({ err: e.message, desc: e });
      res.json({ err: e.message, desc: e });
    }
  };
}

export default LinkController;
