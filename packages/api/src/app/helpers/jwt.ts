import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
const { AUTH_CORE_SECRET } = process.env;

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    user: string;
    session: string;
  }
}

export function signJwt(object, options?: SignOptions) {
  return sign(object, AUTH_CORE_SECRET, options);
}

export function verifyJwt(token: string) {
  try {
    const decoded = verify(token, AUTH_CORE_SECRET) as JwtPayload;
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e) {
    return {
      valid: false,
      expired: true,
      decoded: null,
    };
  }
}
