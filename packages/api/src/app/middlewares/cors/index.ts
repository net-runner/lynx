import { defaultRouteMiddlewareInterface } from '../../../interfaces/index';

const { FRONTEND_URL } = process.env;
const env = process.env.NODE_ENV;
const isProduction = env === 'production';

const corsMiddleware: defaultRouteMiddlewareInterface = (req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    `${isProduction ? FRONTEND_URL : 'http://localhost:4200'}`
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};
export default corsMiddleware;
