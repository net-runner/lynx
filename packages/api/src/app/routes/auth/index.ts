import { Router } from 'hyper-express';
import requireUser from '../../middlewares/auth/requireUser';
import githubRouter from './github';
import googleRouter from './google';
import { handleSignin } from './local/signin';
import { handleSignup } from './local/signup';

const authRouter = new Router();

authRouter.get('/authcheck', requireUser, async (req, res) => {
  res.send('You are authorized');
});

authRouter.post('/signin', handleSignin);
authRouter.post('/signup', handleSignup);

authRouter.use('/signin/github', githubRouter);
authRouter.use('/signin/google', googleRouter);

export default authRouter;
