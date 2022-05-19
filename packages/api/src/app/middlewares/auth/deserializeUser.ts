import { defaultRouteMiddlewareInterface } from '../../../interfaces/index';
import { cookieOptions } from '../../helpers/cookie';
import { verifyJwt } from '../../helpers/jwt';
import { tokenRefresh } from '../../services/session';

const deserializeUser: defaultRouteMiddlewareInterface = async (
  req,
  res,
  next
) => {
  const accessToken =
    req.headers['authorization']?.split(' ')[1] || req.cookies.access_token;

  const refreshToken = req.headers['x-refresh'] || req.cookies.refresh_token;

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await tokenRefresh(refreshToken);

    if (newAccessToken) {
      res.cookie('access_token', newAccessToken, 900000, cookieOptions);
    }

    const result = verifyJwt(newAccessToken as string);
    res.locals.user = result.decoded;
    return next();
  }
  return next();
};

export default deserializeUser;
