import { Router } from 'hyper-express';
import handleStats from '../../controllers/stats';

const statRouter = new Router();

statRouter.get('/', handleStats);

export default statRouter;
