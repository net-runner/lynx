import { Router } from 'hyper-express';
import { UserController } from '../../controllers';

const userRouter = new Router();

userRouter.get('/all', UserController.handleAllUsers);
userRouter.get('/all/groups', UserController.handleAllUsersWithGroups);
userRouter.get('/:user', UserController.handleAllUsersGroups);
userRouter.get('/:user/g/:group', UserController.handleUserGroupLinks);

export default userRouter;
