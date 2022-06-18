import { authorizedRouteHandler } from '../../../interfaces';
import log from '../../helpers/logger';

const requireUser: authorizedRouteHandler = (req, res, next) => {
  log.info('[AUTH] USER CHECK REQUESTED FOR ' + req.originalUrl);
  const id = res.locals.id;

  if (!id || !id.user || !id.session) return res.status(403).end();

  return next();
};

export default requireUser;
