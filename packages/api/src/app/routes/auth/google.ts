import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Router } from 'hyper-express';
import pushDiscordWebhook from '../../helpers/pushDiscordWebhook';

const googleRouter = new Router();

googleRouter.get('/', async (req, res) => {
  res.redirect('https://github.com/login/oauth/authorize');
});
export default googleRouter;
