import { authorizedRouteHandler } from '../../../interfaces';
import { getAllUserGroups } from '../../services/user';

const handleAllUsersGroups: authorizedRouteHandler = async (req, res) => {
  const uid = req.params.user;
  const users = await getAllUserGroups(uid);
  return res.status(200).json(users);
};

export default handleAllUsersGroups;
