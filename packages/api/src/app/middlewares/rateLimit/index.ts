import { defaultRouteMiddlewareInterface } from '../../../interfaces/index';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import log from '../../helpers/logger';
const opts = {
  points: 24, // 12 points
  duration: 1, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddleware: defaultRouteMiddlewareInterface = (
  req,
  res,
  next
) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      log.error('Too many Requests from: ' + req.ips);
      res.status(429).send('Too Many Requests');
    });
};
export default rateLimiterMiddleware;
