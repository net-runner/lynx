import log from '../../helpers/logger';
import pushDiscordWebhook from '../../helpers/pushDiscordWebhook';
import { validateLink } from '../../helpers/dataValidation';
import { createLink } from '../../services/link';
import { authorizedRouteHandler } from '../../../interfaces';

const handleLinkAdd: authorizedRouteHandler = async (req, res) => {
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
    if (!isLinkValidated) return res.status(403).end();

    await createLink(lynxLink);

    const webhBody = {
      embeds: [
        {
          title: `New link added: ${lynxLink.link}`,
          description: `from user ${user}`,
        },
      ],
    };
    pushDiscordWebhook(webhBody);
    res.status(200).end();
  } catch (e) {
    log.error({ err: e.message, desc: e });
    res.json({ err: e.message, desc: e });
  }
};
export { handleLinkAdd };
