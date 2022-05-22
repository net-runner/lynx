import { Router } from 'hyper-express';
import { GithubAuthController } from '../../controllers';

const githubRouter = new Router();
const githubController = new GithubAuthController();

githubRouter.get('/', githubController.oauthRedirect);
githubRouter.get('/callback', githubController.oauthCallback);
githubRouter.post('/hook', githubController.hookEvents);

export default githubRouter;
