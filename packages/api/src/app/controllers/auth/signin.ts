import * as bcrypt from 'bcrypt';
import {
  DefaultRequestLocals,
  DefaultResponseLocals,
  Request,
  Response,
} from 'hyper-express';
import { getUser } from '../../services/user';
import log from '../../helpers/logger';
import pushDiscordWebhook from '../../helpers/pushDiscordWebhook';
import { authorizeAndEnd } from '../../helpers/authorizeAndEnd';

//Function for handling user signin using local strategy (email, password)
export async function handleSignin(
  req: Request<DefaultRequestLocals>,
  res: Response<DefaultResponseLocals>
) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const user = await getUser(email);

    if (!user) return res.status(403).end();

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

    authorizeAndEnd(user, req, res, true);
  } catch (e) {
    log.error({ err: e.message, desc: e.response.data.error_description });
    res.json({ err: e.message, desc: e.response.data.error_description });
  }
}
export default handleSignin;
