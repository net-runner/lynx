import { Router } from 'hyper-express';
import handleCreateTag from '../../controllers/tag/handleCreateTag';
import handleGetTags from '../../controllers/tag/handleGetTags';
import handleGetTagLinkGroups from '../../controllers/tag/handleTagLinkGroups';
import requireUser from '../../middlewares/auth/requireUser';

const tagRouter = new Router();

tagRouter.get('/', handleGetTags);
tagRouter.get('/:tag/g', handleGetTagLinkGroups);

//Protected create new tag
tagRouter.post('/add', requireUser, handleCreateTag);

export default tagRouter;
