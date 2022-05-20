import {
  Response,
  DefaultResponseLocals,
  Request,
  DefaultRequestLocals,
  MiddlewareNext,
} from 'hyper-express';
import { Link } from './data/link';

export interface defaultRouteMiddlewareInterface {
  (
    req: Request<DefaultRequestLocals>,
    res: Response<DefaultResponseLocals>,
    next?: MiddlewareNext
  );
}

export { Link };
