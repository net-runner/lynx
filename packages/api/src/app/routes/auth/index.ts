import { Router } from 'hyper-express';
import githubRouter from './github';
import googleRouter from './google';

const authRouter = new Router();

authRouter.post('/signin', async (req, res) => {
  res.send('amogus');
});

authRouter.post('/signup', async (req, res) => {
  res.send('mogus');
});

authRouter.use('/signin/github', githubRouter);
authRouter.use('/signin/google', googleRouter);

export default authRouter;
