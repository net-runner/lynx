import {
  Response,
  DefaultResponseLocals,
  Request,
  DefaultRequestLocals,
  MiddlewareNext,
} from 'hyper-express';

export interface defaultRouteMiddlewareInterface {
  (
    req: Request<DefaultRequestLocals>,
    res: Response<DefaultResponseLocals>,
    next: MiddlewareNext
  );
}
