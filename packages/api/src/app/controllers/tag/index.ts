import * as qs from 'qs';
import {
  authorizedRouteHandler,
  defaultRouteHandler,
} from '../../../interfaces';

import db from '../../lib/db';
import { getTagLinkGroups, getTags } from '../../services/tag';

const handleGetTags: defaultRouteHandler = async (req, res) => {
  const tags = await getTags();
  // log.info(tags);
  return res.status(200).json(tags);
};
const handleGetTagLinkGroups: defaultRouteHandler = async (req, res) => {
  const tag = Object.keys(qs.parse(req.params.tag))[0];

  const tagLinkGroups = await getTagLinkGroups(tag);

  return res.status(200).json({ tagLinkGroups });
};
const handleCreateTag: authorizedRouteHandler = async (req, res) => {
  return res.end();
};
const handleCreateMultipleGroupTags: authorizedRouteHandler = async (
  req,
  res
) => {
  const body: { groupId: string; tagId: string }[] = await req.json();
  await db.groupTag.createMany({ data: body });

  res.status(200).end();
};

export {
  handleGetTagLinkGroups,
  handleGetTags,
  handleCreateTag,
  handleCreateMultipleGroupTags,
};
