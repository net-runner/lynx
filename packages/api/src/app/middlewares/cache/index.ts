import { defaultRouteMiddlewareInterface } from '../../../interfaces/index';

import log from '../../helpers/logger';
import redisClient from '../../lib/redis';

const cache: defaultRouteMiddlewareInterface = async (req, res) => {
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
