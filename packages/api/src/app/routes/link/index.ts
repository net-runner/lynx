import { Router } from 'hyper-express';
import { handleLinkAdd } from '../../controllers/link';

const linkRouter = new Router();

linkRouter.post('/add', handleLinkAdd);

export default linkRouter;
