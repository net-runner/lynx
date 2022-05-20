import * as bcrypt from 'bcrypt';
import log from '../../helpers/logger';
import {
  DefaultRequestLocals,
  DefaultResponseLocals,
  Request,
  Response,
} from 'hyper-express';
import pushDiscordWebhook from '../../helpers/pushDiscordWebhook';
import {
  AuthProvider,
  findOrCreateUser,
  isEmailFree,
} from '../../services/user';
import { validateSignUp } from '../../helpers/dataValidation';

export async function handleSignup(
  req: Request<DefaultRequestLocals>,
  res: Response<DefaultResponseLocals>
) {
  try {
    const body = await req.json();
    const { name, email, password, repeat_password } = body;
    const lynxUser = {
      name,
      email,
      password,
    };
    log.info(name);
    const isUserValidated = await validateSignUp({
      ...lynxUser,
      repeat_password,
    });
    if (!isUserValidated) return res.status(403).end();

    const isEmailRegistered = await isEmailFree(email);
    if (!isEmailRegistered) return res.status(403).end();

    await bcrypt.hash(password, 10).then((hash) => {
      lynxUser.password = hash;
    });
    await findOrCreateUser(lynxUser, AuthProvider.Local);
    const webhBody = {
      embeds: [
        {
          title: `Lynx new user: ${lynxUser.name}`,
          description: `user authorization accepted`,
        },
      ],
    };
    pushDiscordWebhook(webhBody);
    res.status(200).end();
  } catch (e) {
    log.error({ err: e.message, desc: e.response.data.error_description });
    res.json({ err: e.message, desc: e.response.data.error_description });
  }
}
