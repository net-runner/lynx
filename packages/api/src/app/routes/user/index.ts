import { Router } from 'hyper-express';
import handleAllUsers from '../../controllers/user/getAll';

const userRouter = new Router();

userRouter.get('/all', handleAllUsers);
userRouter.get('/:user', null);
userRouter.get('/:user/g/:group', null);

export default userRouter;
