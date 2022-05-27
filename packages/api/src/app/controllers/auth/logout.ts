import log from '../../helpers/logger';
import { authorizedRouteHandler } from '../../../interfaces';
import { deleteFromCache } from '../../helpers/redis';

const handleLogout: authorizedRouteHandler = async (req, res) => {
  log.info('[USER] Logout for : ' + res.locals.id.user);

  deleteFromCache(res.locals.id.session);

  res.clearCookie('access_token');
  res.clearCookie('refresh_token');

  res.status(200).end();
};
export default handleLogout;
