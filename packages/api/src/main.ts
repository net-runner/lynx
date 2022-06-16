import { Server } from 'hyper-express';
import 'dotenv';
import {
  authRouter,
  linkGroupRouter,
  linkRouter,
  tagRouter,
  userGroupRouter,
  userRouter,
} from './app/routes';
import log from './app/helpers/logger';
import * as cookieParser from 'cookie-parser';
import deserializeUser from './app/middlewares/auth/deserializeUser';
import rateLimiterMiddleware from './app/middlewares/rateLimit';
import * as cors from 'cors';
import statRouter from './app/routes/stats';
import { measureRequest } from './app/middlewares/measureRequest';
const { FRONTEND_URL, NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';
const app = new Server();

// Create GET route to serve 'Hello World'
app.get('/hello', (request, response) => {
  log.info('HELLO');
  response.send('Hello World');
});

//If user requests server favicon
app.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/assets/favicon.ico');
});

//Heatlhcheck route for checking if service is online
app.get('/healthcheck', (req, res) => {
  res.status(200).end();
});
//Handle all of unsuported routes
app.get('/*', (req, res) => {
  res.status(404).send('Unsupported route');
});

const port = process.env.PORT || 80;

app.use(cors({ credentials: true, origin: isProduction ? FRONTEND_URL : '*' }));
app.use(cookieParser());
app.use(deserializeUser);
app.use(rateLimiterMiddleware);
if (!isProduction) {
  app.use(measureRequest);
}

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/stats', statRouter);
app.use('/usersgroup', userGroupRouter);
app.use('/link', linkRouter);
app.use('/linkgroup', linkGroupRouter);
app.use('/tag', tagRouter);

app
  .listen(port as number)
  .then(() => log.info('[START] LYNX API ONLINE: ' + port))
  .catch((error) =>
    log.error('FAILED TO START API: ' + port + ' Error ' + error)
  );
