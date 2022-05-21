import { defaultRouteMiddlewareInterface } from '../../../interfaces';

const requireUser: defaultRouteMiddlewareInterface = (req, res, next) => {
  const user = res.locals.id;

  if (!user) return res.status(404).end();

  return next();
};

export default requireUser;
