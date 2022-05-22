import { Router } from 'hyper-express';
import LinkController from '../../controllers/link';
import requireUser from '../../middlewares/auth/requireUser';

const linkRouter = new Router();

linkRouter.post('/add', requireUser, LinkController.add);
linkRouter.post('/edit/:id', requireUser, null);
linkRouter.post('/del/:id', requireUser, null);

//For getting links no auth required
//implement pagination for /
linkRouter.get('/', null);
linkRouter.get('/:id', LinkController.getSingle);
linkRouter.get('/:limit/:page', LinkController.getMany);

export default linkRouter;
