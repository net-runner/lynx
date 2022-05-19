import log from '../../../helpers/logger';
import { getUser } from '../../../services/user';
import * as bcrypt from 'bcrypt';
import pushDiscordWebhook from '../../../helpers/pushDiscordWebhook';
import { authorizeAndEnd } from '../../../helpers/authorizeAndEnd';
import {
  DefaultRequestLocals,
  DefaultResponseLocals,
  Request,
  Response,
} from 'hyper-express';

//Function for handling user signin using local strategy (email, password)
export async function handleSignin(
  req: Request<DefaultRequestLocals>,
  res: Response<DefaultResponseLocals>
) {
  console.log('SAININ');
  try {
    const body = await req.json();
    const { email, password } = body;
    console.log(body);
    const user = await getUser(email);
    console.log(user);
    if (!user) return res.status(403).end();
    console.log('amogus');

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(403).end();

    const webhBody = {
      embeds: [
        {
          title: `Lynx user logged in: ${body.email}`,
          description: `--`,
        },
      ],
    };
    pushDiscordWebhook(webhBody);

    authorizeAndEnd(user, req, res);
  } catch (e) {
    log.error({ err: e.message, desc: e.response.data.error_description });
    res.json({ err: e.message, desc: e.response.data.error_description });
  }
}
export default handleSignin;
