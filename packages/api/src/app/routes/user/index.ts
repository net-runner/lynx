import { Router } from 'hyper-express';

const userRouter = new Router();

userRouter.get('/:user/g', null);

export default userRouter;
