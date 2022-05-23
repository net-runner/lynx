import {
  DefaultRequestLocals,
  MiddlewareNext,
  Request,
  Response,
} from 'hyper-express';

import log from '../../helpers/logger';
import redisClient from '../../lib/redis';

interface CacheLocals {
  originalSend: Response['send'];
}
interface CacheMiddleWareInterface {
  (
    req: Request<DefaultRequestLocals>,
    res: Response<CacheLocals>,
    next: MiddlewareNext
  );
}
const cache: CacheMiddleWareInterface = async (req, res) => {
  const key = req.originalUrl;

  if (req.method !== 'GET') {
    log.error('Cannot cache non-GET methods!');
    return;
  }

  const cachedResponse = await redisClient.get(key);

  if (cachedResponse) {
    log.info(`Cache hit for ${key}`);
    res.send(cachedResponse);
  } else {
    log.info(`Cache miss for ${key}`);
    return;
  }
};
export default cache;
