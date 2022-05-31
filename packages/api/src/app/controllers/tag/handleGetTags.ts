import { defaultRouteHandler } from '../../../interfaces';
import { getTags } from '../../services/tag';

const handleGetTags: defaultRouteHandler = async (req, res) => {
  const tags = await getTags();
  return res.status(200).json(tags);
};

export default handleGetTags;
