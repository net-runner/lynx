import { Router } from 'hyper-express';
import githubRouter from './github';
import googleRouter from './google';
import signupRouter from './signup';

const authRouter = new Router();

authRouter.post('/signin', async (req, res) => {
  res.send('amogus');
});

authRouter.use('/signup', signupRouter);
authRouter.use('/signin/github', githubRouter);
authRouter.use('/signin/google', googleRouter);

export default authRouter;
