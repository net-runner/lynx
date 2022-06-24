import log from '../../helpers/logger';
import { pushDiscordWebhook } from '../../helpers/pushDiscordWebhook';
import { validateLink } from '../../helpers/dataValidation';
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
import { showSelectedObjectKeys } from '../../helpers/utilsJS';
import { Link } from '@prisma/client';
import { setExCache } from '../../helpers/redis';
class LinkController {
  protected validateAndDestructureBody = async (
    req: Request,
    userId: string,
    actionType: ControllerMethodTypes
  ) => {
    const body = await req.json();
    const lynxLink = showSelectedObjectKeys(body, [
      'id',
      'link',
      'privacyLevel',
      'owner',
      'description',
      'groupId',
      'stars',
    ]) as Link;
    lynxLink.owner = userId;

    log.info(lynxLink.id, lynxLink.link);
    if (
      !lynxLink.link.startsWith('https://') &&
      !lynxLink.link.startsWith('http://')
    )
      lynxLink.link = `https://${lynxLink.link}`;
    const isLinkValidated = await validateLink(lynxLink, actionType);
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
      return res.status(500).json({ err: e.message, desc: e });
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
      return res.status(500).json({ err: e.message, desc: e });
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
      return res.status(500).json({ err: e.message, desc: e });
    }
  };
  public getSingle: defaultRouteHandler = async (req, res) => {
    try {
      const { id } = req.params;

      const linkFromDb = await getLinkFromDatabase(id);
      if (!linkFromDb) return res.status(404).end();

      //Save record to redis
      const key = req.originalUrl;
      setExCache(key, 3600, JSON.stringify(linkFromDb));

      const discordWebhookBody = {
        title: `GET link from db: ${linkFromDb.link}`,
        description: `link id: ${id}`,
      };
      pushDiscordWebhook(discordWebhookBody);

      res.status(200).json(linkFromDb);
    } catch (e) {
      log.error({ err: e.message, desc: e });
      return res.status(500).json({ err: e.message, desc: e });
    }
  };
  public getMany: defaultRouteHandler = async (req, res) => {
    try {
      const limit = parseInt(req.params.limit);
      const page = parseInt(req.params.page) || 0;
      const skip = parseInt(req.params.skip) || 0;

      if (limit > 50) return res.status(400).send('Limit exceeded');
      if (isNaN(limit)) return res.status(400).send('Limit has to be a number');

      const linksFromDb = await getLinksFromDatabase(limit, page);
      if (!linksFromDb) return res.status(404).end();

      const discordWebhookBody = {
        title: `GET links array from db`,
        description: `limit: ${limit}, page: ${page}, skip: ${skip}`,
      };
      pushDiscordWebhook(discordWebhookBody);

      res.status(200).json({
        currentPage: page,
        links: linksFromDb,
      });
    } catch (e) {
      log.error({ err: e.message, desc: e });
      return res.status(500).json({ err: e.message, desc: e });
    }
  };
}

export default LinkController;
