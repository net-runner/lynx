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
import corsMiddleware from './app/middlewares/cors';
import log from './app/helpers/logger';
import * as cookieParser from 'cookie-parser';
import deserializeUser from './app/middlewares/auth/deserializeUser';

const env = process.env.NODE_ENV;
const app = new Server();

// Create GET route to serve 'Hello World'
app.get('/hello', (request, response) => {
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

if (env !== 'development') {
  app.use(corsMiddleware);
}
app.use(cookieParser());
app.use(deserializeUser);

const port = process.env.PORT || 80;

app.use('/auth', authRouter);
app.use('/users', userRouter);
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

//Handle all of unsuported routes
app.get('/*', (req, res) => {
  res.status(404).send('Unsuported route');
});
