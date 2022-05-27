import { defaultRouteMiddlewareInterface } from '../../../interfaces';
import log from '../../helpers/logger';

const requireUser: defaultRouteMiddlewareInterface = (req, res, next) => {
  log.info('[AUTH] USER CHECK REQUESTED FOR ' + req.originalUrl);
  const user = res.locals.id;

  if (!user) return res.status(403).end();

  return next();
};

export default requireUser;
