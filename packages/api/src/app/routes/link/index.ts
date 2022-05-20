import { Router } from 'hyper-express';
import { handleLinkAdd } from '../../controllers/link';
import requireUser from '../../middlewares/auth/requireUser';

const linkRouter = new Router();

linkRouter.post('/add', requireUser, handleLinkAdd);
linkRouter.post('/edit/:id', requireUser, null);
linkRouter.post('/del/:id', requireUser, null);

//For getting links no auth required
linkRouter.get('/', null);
linkRouter.get('/:id', null);

export default linkRouter;
