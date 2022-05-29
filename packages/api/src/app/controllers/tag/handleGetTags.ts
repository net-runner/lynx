import { authorizedRouteHandler } from '../../../interfaces';

const handleGetTags: authorizedRouteHandler = async (req, res) => {
  return res.end();
};

export default handleGetTags;
