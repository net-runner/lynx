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
import corsMiddleware from './app/middlewares';
const env = process.env.NODE_ENV || 'development';
const app = new Server();

// Create GET route to serve 'Hello World'
app.get('/hello', (request, response) => {
  response.send('Hello World');
});

//If user requests server favicon
app.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/assets/favicon.ico');
});

if (env !== 'development') {
  app.use(corsMiddleware);
}

const port = process.env.PORT || 80;

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/usersgroup', userGroupRouter);
app.use('/link', linkRouter);
app.use('/linkgroup', linkGroupRouter);
app.use('/tag', tagRouter);

app
  .listen(port as number)
  .then(() => console.log('[START] LYNX API ONLINE: ' + port))
  .catch((error) =>
    console.log('[ERROR] FAILED TO START API: ' + port + ' Error ' + error)
  );

//Handle all of unsuported routes
app.get('/*', (req, res) => {
  res.status(404).send('Unsuported route');
});
