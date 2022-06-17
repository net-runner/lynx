import {
  authorizedRouteHandler,
  defaultRouteHandler,
} from '../../../interfaces';
import log from '../../helpers/logger';
import { getTagLinkGroups, getTags } from '../../services/tag';

const handleGetTags: defaultRouteHandler = async (req, res) => {
  const tags = await getTags();
  // log.info(tags);
  return res.status(200).json(tags);
};
const handleGetTagLinkGroups: defaultRouteHandler = async (req, res) => {
  const tag = req.params.tag;
  const tagLinkGroups = await getTagLinkGroups(tag);
  // log.info(tagLinkGroups);
  return res.status(200).json({ tagLinkGroups });
};
const handleCreateTag: authorizedRouteHandler = async (req, res) => {
  return res.end();
};

export { handleGetTagLinkGroups, handleGetTags, handleCreateTag };
