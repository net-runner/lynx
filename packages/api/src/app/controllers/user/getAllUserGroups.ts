import { authorizedRouteHandler } from '../../../interfaces';
import { getAllUserGroups } from '../../services/user';

const handleAllUsersGroups: authorizedRouteHandler = async (req, res) => {
  const username = req.params.user;
  const userLinkgroups = await getAllUserGroups(username);
  return res.status(200).json(userLinkgroups);
};

export default handleAllUsersGroups;
