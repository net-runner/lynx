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
import { filterObjectKeys } from '../../helpers/utilsJS';

export const handleLinkAdd: authorizedRouteHandler = async (req, res) => {
  try {
    const body = await req.json();
    const { link, privacyLevel, description, group } = body;
    const user = res.locals.id.user;
    const lynxLink = {
      link,
      privacyLevel,
      owner: user,
      description,
      group,
    };
    log.info(link);

    const isLinkValidated = await validateLink(lynxLink);
    if (!isLinkValidated) return res.status(400).end();

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

export const handleGetLink: defaultRouteHandler = async (req, res) => {
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

    const linkResponse = JSON.stringify(
      filterObjectKeys(linkFromDb, [
        'link',
        'privacyLevel',
        'owner',
        'group',
        'description',
        'stars',
      ])
    );
    res.status(200).send(linkResponse);
  } catch (e) {
    log.error({ err: e.message, desc: e });
    res.json({ err: e.message, desc: e });
  }
};

export const handleGetLinks: defaultRouteHandler = async (req, res) => {
  try {
    const body = await req.json();
    const { limit, page } = body;

    if (limit > 50) return res.status(400).send('Limit exceeded');
    if (typeof limit !== 'number' || typeof page !== 'number')
      return res.status(400).send('Limit and page have to be numbers');

    const linksFromDb = await getLinksFromDatabase(limit, page);

    const discordWebhookBody = {
      title: `GET links array from db, limit: ${limit}, page: ${page}`,
      description: `---`,
    };
    pushDiscordWebhook(discordWebhookBody);

    const linksResponse = JSON.stringify(
      linksFromDb.map((linkFromDb) =>
        filterObjectKeys(linkFromDb, [
          'link',
          'privacyLevel',
          'owner',
          'group',
          'description',
          'stars',
        ])
      )
    );
    res.status(200).send(linksResponse);
  } catch (e) {
    log.error({ err: e.message, desc: e });
    res.json({ err: e.message, desc: e });
  }
};
