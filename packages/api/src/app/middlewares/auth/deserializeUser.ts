import { defaultRouteMiddlewareInterface } from '../../../interfaces/index';
import { cookieOptions } from '../../helpers/cookie';
import { verifyJwt } from '../../helpers/jwt';
import log from '../../helpers/logger';
import { tokenRefresh } from '../../services/session';

const deserializeUser: defaultRouteMiddlewareInterface = async (req, res) => {
  try {
    const accessToken =
      req.headers['authorization']?.split(' ')[1] || req.cookies.access_token;

    const refreshToken = req.headers['x-refresh'] || req.cookies.refresh_token;

    if (!accessToken) {
      return;
    }

    const { decoded, expired } = verifyJwt(accessToken);
    if (decoded) {
      console.log(decoded);
      res.locals.id = decoded;
      return;
    }

    if (expired && refreshToken) {
      const newAccessToken = await tokenRefresh(refreshToken);
      log.info('[AUTH] Minted new acces token for ' + req.ip);
      if (newAccessToken) {
        res.setHeader('x-access-token', newAccessToken as string);
        res.setHeader('Authorization', ('Bearer ' + newAccessToken) as string);
        res.cookie(
          'access_token',
          newAccessToken,
          365 * 24 * 60 * 60,
          cookieOptions
        );
      }

      const result = verifyJwt(newAccessToken as string);
      res.locals.id = result.decoded;
      return;
    }
  } catch (e) {
    log.error(e);
  }

  return;
};

export default deserializeUser;
