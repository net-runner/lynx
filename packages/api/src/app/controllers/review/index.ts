import { Review } from '@prisma/client';
import { authorizedRouteHandler } from '../../../interfaces';
import log from '../../helpers/logger';
import { pushDiscordWebhook } from '../../helpers/pushDiscordWebhook';
import { createReview } from '../../services/review';
const handleReviewAdd: authorizedRouteHandler = async (req, res) => {
  try {
    const body = (await req.json()) as Omit<Review, 'id' | 'link'>;

    const review = await createReview(body);
    if (!review) return res.status(404).end();

    const discordWebhookBody = {
      title: `Created new review | creatorName: ${body.creatorName}`,
      description: `with score: ${body.score} | description: ${body.description}`,
    };
    pushDiscordWebhook(discordWebhookBody);

    res.status(200).json({ success: true });
  } catch (e) {
    log.error({ err: e.message, desc: e });
    return res.status(500).json({ err: e.message, desc: e });
  }
};

export { handleReviewAdd };
