import { Router } from 'hyper-express';
import { LinkController } from '../../controllers';
import requireUser from '../../middlewares/auth/requireUser';
import cache from '../../middlewares/cache';

const linkRouter = new Router();
const linkController = new LinkController();

linkRouter.post('/add', requireUser, linkController.add);
linkRouter.post('/edit/:id', requireUser, linkController.edit);
linkRouter.post('/del/:id', requireUser, linkController.delete);

//For getting links no auth required
//TODO implement pagination for /
linkRouter.get('/', null);
linkRouter.get('/:id', cache, linkController.getSingle);
linkRouter.get('/:limit/:page', cache, linkController.getMany);

export default linkRouter;
