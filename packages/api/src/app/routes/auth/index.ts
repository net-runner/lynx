import { Router } from 'hyper-express';

const authRouter = new Router();

authRouter.post('/login', async (req, res) => {
  return 'amogus';
});

authRouter.post('/register', async (req, res) => {
  return 'amogus';
});

export default authRouter;
