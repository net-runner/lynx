import { authorizedRouteHandler } from '../../../interfaces';
import {
  getAllUsers,
  getAllUserGroups,
  getAllUserGroupLinks,
  getAllUsersWithGroups,
} from '../../services/user';

const handleAllUsers: authorizedRouteHandler = async (req, res) => {
  const users = await getAllUsers();
  return res.status(200).json(users);
};
const handleAllUsersWithGroups: authorizedRouteHandler = async (req, res) => {
  const users = await getAllUsersWithGroups();
  return res.status(200).json(users);
};

const handleUserGroupLinks: authorizedRouteHandler = async (req, res) => {
  const username = req.params.user;
  const group = req.params.group;
  const links = await getAllUserGroupLinks(username, group);
  console.log(links);
  return res.status(200).json(links);
};

const handleAllUsersGroups: authorizedRouteHandler = async (req, res) => {
  const username = req.params.user;
  const userLinkgroups = await getAllUserGroups(username);
  return res.status(200).json(userLinkgroups);
};

export {
  handleAllUsersGroups,
  handleAllUsers,
  handleUserGroupLinks,
  handleAllUsersWithGroups,
};
