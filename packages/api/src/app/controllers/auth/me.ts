import { authorizedRouteHandler } from '../../../interfaces';
import log from '../../helpers/logger';
import { hideSelectedObjectKeys } from '../../helpers/utilsJS';
import { getUserById } from '../../services/user';

const handleMe: authorizedRouteHandler = async (req, res) => {
  const usrId = res.locals.id.user;

  log.info('[USER] Get profile: ' + usrId);
  const user = await getUserById(res.locals.id.user);
  const wuser = hideSelectedObjectKeys(user, ['id', 'password']);

  res.json(wuser);
};

export default handleMe;
