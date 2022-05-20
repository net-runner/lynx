import { Router } from 'hyper-express';
import {
  handleGithubHookEvents,
  handleGithubOauthCallback,
  handleGithubOauthRedirect,
} from '../../controllers/auth/github';

const githubRouter = new Router();

githubRouter.get('/', handleGithubOauthRedirect);
githubRouter.get('/callback', handleGithubOauthCallback);
githubRouter.post('/hook', handleGithubHookEvents);

export default githubRouter;
