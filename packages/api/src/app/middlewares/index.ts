import {
  Response,
  DefaultResponseLocals,
  Request,
  DefaultRequestLocals,
} from 'hyper-express';
const { FRONTEND_URL } = process.env;
const corsMiddleware = (
  req: Request<DefaultRequestLocals>,
  res: Response<DefaultResponseLocals>,
  next
) => {
  res.header('Access-Control-Allow-Origin', `${FRONTEND_URL}`);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};
export default corsMiddleware;
