import {
  Response,
  DefaultResponseLocals,
  Request,
  DefaultRequestLocals,
  MiddlewareNext,
} from 'hyper-express';
import { JwtPayload } from 'jsonwebtoken';
import { Link } from './data/link';

export interface defaultRouteMiddlewareInterface {
  (
    req: Request<DefaultRequestLocals>,
    res: Response<DefaultResponseLocals>,
    next?: MiddlewareNext
  );
}
export interface defaultRouteHandler {
  (req: Request<DefaultRequestLocals>, res: Response<DefaultResponseLocals>);
}

interface AuthorizedRouteLocals {
  id: JwtPayload;
}
export interface authorizedRouteHandler {
  (req: Request<DefaultRequestLocals>, res: Response<AuthorizedRouteLocals>);
}

export { Link };
