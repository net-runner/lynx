import { Router } from 'hyper-express';
import handleMe from '../../controllers/auth/me';
import handleSignin from '../../controllers/auth/signin';
import handleSignup from '../../controllers/auth/signup';
import log from '../../helpers/logger';
import requireUser from '../../middlewares/auth/requireUser';
import { getUserById } from '../../services/user';
import githubRouter from './github';
import googleRouter from './google';

const authRouter = new Router();

authRouter.get('/authcheck', requireUser, async (req, res) => {
  res.send('You are authorized');
});

authRouter.get('/me', requireUser, handleMe);

authRouter.post('/signin', handleSignin);
authRouter.post('/signup', handleSignup);

authRouter.use('/signin/github', githubRouter);
authRouter.use('/signin/google', googleRouter);

export default authRouter;
