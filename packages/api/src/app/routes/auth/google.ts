import { Router } from 'hyper-express';
import { GoogleAuthController } from '../../controllers';

const googleRouter = new Router();
const googleController = new GoogleAuthController();

googleRouter.get('/', googleController.oauthRedirect);
googleRouter.get('/callback', googleController.oauthCallback);

export default googleRouter;
