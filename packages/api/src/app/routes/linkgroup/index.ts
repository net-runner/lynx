import { Router } from 'hyper-express';
import requireUser from '../../middlewares/auth/requireUser';
import { LinkGroupController } from '../../controllers';

const linkGroupRouter = new Router();
const linkGroupController = new LinkGroupController();

linkGroupRouter.post('/add', requireUser, linkGroupController.add);
linkGroupRouter.post('/edit', requireUser, linkGroupController.edit);
linkGroupRouter.post('/del', requireUser, linkGroupController.delete);

//For getting links no auth required
//implement pagination for /
linkGroupRouter.get('/', null);
linkGroupRouter.get('/:id', linkGroupController.getSingle);
linkGroupRouter.get('/:limit/:page', linkGroupController.getMany);
linkGroupRouter.get('/:limit/:page/:skip', linkGroupController.getMany);

export default linkGroupRouter;
