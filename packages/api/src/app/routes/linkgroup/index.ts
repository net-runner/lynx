import { Router } from 'hyper-express';
import requireUser from '../../middlewares/auth/requireUser';
import { LinkGroupController } from '../../controllers';

const linkGroupRouter = new Router();
const linkGroupController = new LinkGroupController();

linkGroupRouter.post('/add', requireUser, linkGroupController.add);
linkGroupRouter.post('/edit/:id', requireUser, linkGroupController.edit);
linkGroupRouter.post('/del/:id', requireUser, linkGroupController.delete);

//For getting links no auth required
//implement pagination for /
linkGroupRouter.get('/', null);
linkGroupRouter.get('/:id', linkGroupController.getSingle);
linkGroupRouter.get('/:limit/:page', linkGroupController.getMany);

export default linkGroupRouter;
