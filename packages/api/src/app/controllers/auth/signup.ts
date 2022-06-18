import * as bcrypt from 'bcrypt';
import log from '../../helpers/logger';
import { pushDiscordWebhook } from '../../helpers/pushDiscordWebhook';
import {
  AuthProvider,
  findOrCreateUser,
  isEmailFree,
} from '../../services/user';
import { validateSignUp } from '../../helpers/dataValidation';
import { defaultRouteHandler } from '../../../interfaces';

const handleSignup: defaultRouteHandler = async (req, res) => {
  try {
    const body = await req.json();
    const { name, email, password, repeat_password } = body;
    const lynxUser = {
      name,
      email,
      password,
      repeat_password,
    };
    log.info(name);

    const isUserValidated = await validateSignUp(lynxUser);
    if (!isUserValidated) return res.status(400).end();

    const isEmailRegistered = await isEmailFree(email);
    if (!isEmailRegistered)
      return res.status(403).send('This email is already in database');

    await bcrypt.hash(password, 10).then((hash) => {
      lynxUser.password = hash;
    });
    await findOrCreateUser(lynxUser, AuthProvider.Local);
    const discordWebhookBody = {
      title: `Lynx new user: ${lynxUser.name}`,
      description: `user authorization accepted`,
    };
    pushDiscordWebhook(discordWebhookBody);
    res.status(200).end();
  } catch (e) {
    log.error({ err: e.message, desc: e.response.data.error_description });
    res.json({ err: e.message, desc: e.response.data.error_description });
  }
};
export default handleSignup;
