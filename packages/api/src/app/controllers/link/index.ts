import log from '../../helpers/logger';
import {
  DefaultRequestLocals,
  DefaultResponseLocals,
  Request,
  Response,
} from 'hyper-express';
import pushDiscordWebhook from '../../helpers/pushDiscordWebhook';
import { validateLink } from '../../helpers/dataValidation';
import { addLink } from '../../services/link';

export async function handleLinkAdd(
  req: Request<DefaultRequestLocals>,
  res: Response<DefaultResponseLocals>
) {
  try {
    const body = await req.json();
    const { link, privacyLevel, owner, description, group } = body;
    const lynxLink = {
      link,
      privacyLevel,
      owner,
      description,
      group,
    };
    log.info(link);

    const isLinkValidated = await validateLink(lynxLink);
    if (!isLinkValidated) return res.status(403).end();

    await addLink(lynxLink);

    const webhBody = {
      embeds: [
        {
          title: `new link added: ${lynxLink.link}`,
          description: `-`,
        },
      ],
    };
    pushDiscordWebhook(webhBody);
    res.status(200).end();
  } catch (e) {
    log.error({ err: e.message, desc: e });
    res.json({ err: e.message, desc: e });
  }
}
