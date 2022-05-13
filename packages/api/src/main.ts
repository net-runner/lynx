import { Server } from 'hyper-express';
import 'dotenv';
const webserver = new Server();

// Create GET route to serve 'Hello World'
webserver.get('/', (request, response) => {
  response.send('Hello World');
});

// Activate webserver by calling .listen(port, callback);

const port = process.env.PORT || 80;

webserver
  .listen(port as number)
  .then((socket) => console.log('Webserver started on port: ' + port))
  .catch((error) => console.log('Failed to start webserver on port: ' + port));
