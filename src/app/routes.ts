import * as express from 'express';
import userRoutes from './modules/User/Users.routes';
import MainController from './Main.controller';

const route = express.Router();

route.use('/user', userRoutes);

// main routes
route.get('/media/:name', MainController.getMedia);

export default route;
