import { defaultRouteMiddlewareInterface } from '../../../interfaces/index';
import { refreshCookieOptions } from '../../helpers/cookie';
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
    log.info(decoded);
    log.info(expired);
    if (decoded) {
      res.locals.user = decoded;
      return;
    }

    if (expired && refreshToken) {
      log.info('AKSES');
      const newAccessToken = await tokenRefresh(refreshToken);
      log.info(newAccessToken);
      if (newAccessToken) {
        res.setHeader('x-access-token', newAccessToken as string);
        res.cookie(
          'access_token',
          newAccessToken,
          900000,
          refreshCookieOptions
        );
      }

      const result = verifyJwt(newAccessToken as string);
      res.locals.user = result.decoded;
      return;
    }
  } catch (e) {
    log.error(e);
  }

  return;
};

export default deserializeUser;
