import { defaultRouteMiddlewareInterface } from 'packages/api/src/interfaces';
const { FRONTEND_URL } = process.env;

const corsMiddleware: defaultRouteMiddlewareInterface = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${FRONTEND_URL}`);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};
export default corsMiddleware;
