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
const app = new Server();

// Create GET route to serve 'Hello World'
app.get('/hello', (request, response) => {
  response.send('Hello World');
});

// Handle other routes
app.get('*', (req, res) => {
  res.send('Unsuported route');
});

const port = process.env.PORT || 80;

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/usersgroup', userGroupRouter);
app.use('/link', linkRouter);
app.use('/linkgroup', linkGroupRouter);
app.use('/tag', tagRouter);

app
  .listen(port as number)
  .then(() => console.log('[START] LYNX ONLINE API: ' + port))
  .catch((error) =>
    console.log('[ERROR] FAILED TO START API: ' + port + ' Error ' + error)
  );
