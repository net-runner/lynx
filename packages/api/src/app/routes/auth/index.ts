import { Router } from 'hyper-express';
import githubRouter from './github';

const authRouter = new Router();

authRouter.post('/signin', async (req, res) => {
  res.send('amogus');
});

authRouter.post('/signup', async (req, res) => {
  res.send('mogus');
});

authRouter.use('/signin/github', githubRouter);

authRouter.get('/signin/google', async (req, res) => {
  res.redirect('https://github.com/login/oauth/authorize');
});

export default authRouter;
