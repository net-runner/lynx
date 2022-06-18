import * as bcrypt from 'bcrypt';
import { AuthProvider, getUser } from '../../services/user';
import log from '../../helpers/logger';
import { pushDiscordWebhook } from '../../helpers/pushDiscordWebhook';
import { authorizeAndEnd } from '../../helpers/authorizeAndEnd';
import { defaultRouteHandler } from '../../../interfaces';

//Function for handling user signin using local strategy (email, password)
const handleSignin: defaultRouteHandler = async (req, res) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await getUser(email);
    if (!user) return res.status(404).end();

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(403).end();

    const discordWebhookBody = {
      title: `Lynx user logged in: ${body.email}`,
      description: `--`,
    };
    pushDiscordWebhook(discordWebhookBody);

    return authorizeAndEnd(user, req, res, AuthProvider.Local, true);
  } catch (e) {
    log.error(e);
    res.json({ err: e.message, desc: e.response.data.error_description });
  }
};
export default handleSignin;
