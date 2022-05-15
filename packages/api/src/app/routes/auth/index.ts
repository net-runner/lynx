import { Router } from 'hyper-express';

const authRouter = new Router();

authRouter.post('/signin', async (req, res) => {
  return 'amogus';
});

authRouter.post('/singup', async (req, res) => {
  return 'amogus';
});

authRouter.get('/signin/github', async (req, res) => {
  res.redirect('https://github.com/login/oauth/authorize');
});
authRouter.post('/signin/github/callback', async (req, res) => {
  res.redirect('https://github.com/login/oauth/authorize');
});
authRouter.get('/signin/google', async (req, res) => {
  res.redirect('https://github.com/login/oauth/authorize');
});

export default authRouter;
