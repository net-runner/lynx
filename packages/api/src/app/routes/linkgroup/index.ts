import { Router } from 'hyper-express';
import requireUser from '../../middlewares/auth/requireUser';
import { LinkGroupController } from '../../controllers';
import cache from '../../middlewares/cache';

const linkGroupRouter = new Router();
const linkGroupController = new LinkGroupController();

linkGroupRouter.post('/add', requireUser, linkGroupController.add);
linkGroupRouter.post('/edit', requireUser, linkGroupController.edit);
linkGroupRouter.post('/del', requireUser, linkGroupController.delete);
linkGroupRouter.post('/incrementLinkedCount', linkGroupController.incrementLinkedCount);

linkGroupRouter.get('/:id', cache, linkGroupController.getSingle);
linkGroupRouter.get('/:limit/:page', linkGroupController.getMany);
linkGroupRouter.get('/:limit/:page/:skip', linkGroupController.getMany);
linkGroupRouter.get('/:limit/:page/:skip/:privacylevel', linkGroupController.getMany);

export default linkGroupRouter;
