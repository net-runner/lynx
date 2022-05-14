import { Server } from 'hyper-express';
import 'dotenv';
import authRouter from './app/routes/auth';
const webserver = new Server();

// Create GET route to serve 'Hello World'
webserver.get('/hello', (request, response) => {
  response.send('Hello World');
});

// Activate webserver by calling .listen(port, callback);

const port = process.env.PORT || 80;

webserver.use('/auth', authRouter);
webserver.use('/users', authRouter);
webserver.use('/links', authRouter);
webserver.use('/linkgroups', authRouter);

webserver
  .listen(port as number)
  .then((socket) => console.log('Webserver started on port: ' + port))
  .catch((error) => console.log('Failed to start webserver on port: ' + port));
