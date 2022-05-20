import { Router } from 'hyper-express';
import {
  handleGoogleOauthCallback,
  handleGoogleOauthRedirect,
} from '../../controllers/auth/google';

const googleRouter = new Router();

googleRouter.get('/', handleGoogleOauthRedirect);
googleRouter.get('/callback', handleGoogleOauthCallback);

export default googleRouter;
