import log from '../../helpers/logger';
import { authorizedRouteHandler } from '../../../interfaces';
import { removeSession } from '../../services/session';

const handleLogout: authorizedRouteHandler = async (req, res) => {
  log.info('[USER] Logout for sessionID : ' + res.locals.id.session);

  await removeSession(res.locals.id.session);

  res.clearCookie('access_token');
  res.clearCookie('refresh_token');

  res.status(200).end();
};
export default handleLogout;
