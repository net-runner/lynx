import { authorizedRouteHandler } from '../../../interfaces';
import { getAllUsers } from '../../services/user';

const handleAllUsers: authorizedRouteHandler = async (req, res) => {
  const users = await getAllUsers();
  return res.status(200).json(users);
};

export default handleAllUsers;
