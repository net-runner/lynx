import { Router } from 'hyper-express';
import {
  handleCreateTag,
  handleGetTagLinkGroups,
  handleGetTags,
} from '../../controllers/tag';

import requireUser from '../../middlewares/auth/requireUser';

const tagRouter = new Router();

tagRouter.get('/', handleGetTags);
tagRouter.get('/:tag/g', handleGetTagLinkGroups);

//Protected create new tag
tagRouter.post('/add', requireUser, handleCreateTag);

export default tagRouter;
