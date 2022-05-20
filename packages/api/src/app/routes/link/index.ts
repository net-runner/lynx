import { Router } from 'hyper-express';
import { handleLinkAdd } from '../../controllers/link';
import requireUser from '../../middlewares/auth/requireUser';

const linkRouter = new Router();

linkRouter.post('/add', requireUser, handleLinkAdd);

export default linkRouter;
