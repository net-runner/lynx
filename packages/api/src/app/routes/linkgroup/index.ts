import { Router } from 'hyper-express';
import requireUser from '../../middlewares/auth/requireUser';

const linkGroupRouter = new Router();

linkGroupRouter.post('/add', requireUser, null);
linkGroupRouter.post('/edit/:id', requireUser, null);
linkGroupRouter.post('/del/:id', requireUser, null);

//For getting links no auth required
linkGroupRouter.get('/', null);
linkGroupRouter.get('/:id', null);

export default linkGroupRouter;
