import { Router } from 'hyper-express';
import requireUser from '../../middlewares/auth/requireUser';
import githubRouter from './github';
import googleRouter from './google';
import signupRouter from './signup';

const authRouter = new Router();

authRouter.post('/signin', async (req, res) => {
  res.send('amogus');
});

authRouter.get('/authcheck', requireUser, async (req, res) => {
  res.send('You are authorized');
});

authRouter.use('/signup', signupRouter);
authRouter.use('/signin/github', githubRouter);
authRouter.use('/signin/google', googleRouter);

export default authRouter;
