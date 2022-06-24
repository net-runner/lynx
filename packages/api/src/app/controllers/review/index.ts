import { Review } from '@prisma/client';
import { authorizedRouteHandler } from '../../../interfaces';
import log from '../../helpers/logger';
import { pushDiscordWebhook } from '../../helpers/pushDiscordWebhook';
import { createReview, deleteReview } from '../../services/review';
import { getUserById } from '../../services/user';
const handleReviewAdd: authorizedRouteHandler = async (req, res) => {
  try {
    const body = (await req.json()) as Omit<Review, 'id' | 'link'>;

    //Check user
    const usrId = res.locals.id.user;
    const user = await getUserById(usrId);
    if (user && body.creatorName === user.username) {
      const review = await createReview(body);
      if (!review) return res.status(404).end();

      const discordWebhookBody = {
        title: `Created new review | creatorName: ${body.creatorName}`,
        description: `with score: ${body.score} | description: ${body.description}`,
      };
      pushDiscordWebhook(discordWebhookBody);

      res.status(200).json({ success: true });
    } else {
      return res.status(403).end();
    }
  } catch (e) {
    log.error({ err: e.message, desc: e });
    return res.status(500).json({ err: e.message, desc: e });
  }
};
const handleReviewDelete: authorizedRouteHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const usrId = res.locals.id.user;
    const user = await getUserById(usrId);

    const review = await deleteReview(id, user.username);
    if (!review) return res.status(404).end();

    const discordWebhookBody = {
      title: `Review deleted | id: ${id}`,
      description: `--==--`,
    };
    pushDiscordWebhook(discordWebhookBody);

    res.status(200).json({ success: true });
  } catch (e) {
    log.error({ err: e.message, desc: e });
    return res.status(500).json({ err: e.message, desc: e });
  }
};

export { handleReviewAdd, handleReviewDelete };
