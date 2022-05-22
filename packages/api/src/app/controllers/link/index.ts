import log from '../../helpers/logger';
import { pushDiscordWebhook } from '../../helpers/pushDiscordWebhook';
import { validateLink } from '../../helpers/dataValidation';
import {
  createLink,
  getLinkFromDatabase,
  getLinksFromDatabase,
} from '../../services/link';
import {
  authorizedRouteHandler,
  defaultRouteHandler,
} from '../../../interfaces';

class LinkController {
  protected validateAndDestructure = async (req, res, user) => {
    const body = await req.json();
    const { link, privacyLevel, description, group } = body;
    const lynxLink = {
      link,
      privacyLevel,
      owner: user,
      description,
      group,
    };
    log.info(link);

    const isLinkValidated = await validateLink(lynxLink);
    if (!isLinkValidated) return false;
    return lynxLink;
  };
  public add: authorizedRouteHandler = async (req, res) => {
    try {
      const user = res.locals.id.user;
      const lynxLink = await this.validateAndDestructure(req, res, user);
      if (!lynxLink) return res.status(400).end();

      await createLink(lynxLink);

      const discordWebhookBody = {
        title: `New link added: ${lynxLink.link}`,
        description: `from user ${user}`,
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

      const discordWebhookBody = {
        title: `GET link from db: ${linkFromDb.link}`,
        description: `link id: ${id}`,
      };
      pushDiscordWebhook(discordWebhookBody);

      const linkResponse = JSON.stringify(linkFromDb);
      res.status(200).send(linkResponse);
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

      const discordWebhookBody = {
        title: `GET links array from db, limit: ${limit}, page: ${page}`,
        description: `---`,
      };
      pushDiscordWebhook(discordWebhookBody);

      const linksResponse = JSON.stringify(
        linksFromDb.map((linkFromDb) => linkFromDb)
      );
      res.status(200).send(linksResponse);
    } catch (e) {
      log.error({ err: e.message, desc: e });
      res.json({ err: e.message, desc: e });
    }
  };
}

export default new LinkController();
