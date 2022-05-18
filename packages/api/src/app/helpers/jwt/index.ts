import jwt from 'jsonwebtoken';
import log from '../logger';
const { AUTH_CORE_SECRET } = process.env;

export function signJwt(object, options?: jwt.SignOptions) {
  return jwt.sign(object, AUTH_CORE_SECRET, { options });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, AUTH_CORE_SECRET);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e) {
    log.error(e);
    return {
      valid: false,
      expired: e.message === 'Token expired',
      decoded: null,
    };
  }
}
