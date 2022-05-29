import { Router } from 'hyper-express';
import handleAllUsersGroups from '../../controllers/user/getAllUserGroups';
import handleAllUsers from '../../controllers/user/getAllUserGroups';

const userRouter = new Router();

userRouter.get('/all', handleAllUsers);
userRouter.get('/:user', handleAllUsersGroups);
userRouter.get('/:user/g/:group', null);

export default userRouter;
