import * as cors from 'cors';
import * as express from 'express';
import { Application, Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { CloudInterface } from './core/cloud/CloudInterface';
import { Obj } from './core/types/Types';
import { Error as ErrorMid } from './middlewares/Error.middleware';
import { ResponseMiddleware } from './middlewares/Responses.middleware';
import Routes from './routes';
import { swaggerDocument } from './swagger';

const SwaggerUi = require('swagger-ui-express');
const multipart = require('connect-multiparty');

const multipartMiddleware = multipart();

// Application Class
class App {
  app: Application = express();
  constructor(env: Obj) {
    this.setUpRoutesAndMiddleware();
    if (env.NODE_ENV !== 'test') this.setUpDataBase(env);
    this.setUpCloud(env);
  }

  setUpRoutesAndMiddleware() {
    // cors middleware
    this.app.use(cors());
    this.app.use((req, res, next) => {
      res.header('Access-Control-Expose-Headers', '*');
      next();
    });

    // set response functions
    this.app.use(ResponseMiddleware);
    // swagger
    this.app.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));

    // body parsing middleware
    this.app.use(multipartMiddleware);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    // set views
    this.app.set('view engine', 'ejs');
    this.app.set('views', `${__dirname}/views`);

    // routes
    this.app.use('/api', Routes);

    // static folders
    // this.app.use('/public', express.static(path.join(__dirname, 'public')));
    // this.app.use(express.static(path.join(__dirname, 'build')));
    // this.app.use('/', (req, res) => {
    //     return res.sendFile(path.join(__dirname, 'build', 'index.html'));
    // });

    // error middleware
    this.app.use(ErrorMid);
  }

  setUpServer(env: Obj) {
    // starting the server
    const { PORT } = env;
    this.app.listen(8000, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  }

  setUpDataBase(env: Obj) {
    const { DB_ADDRESS } = env;

    if (!DB_ADDRESS) throw new Error("You didn't set the db address");

    return mongoose
      .connect(DB_ADDRESS)
      .then(db => {
        console.log('Db connected ');
      })
      .catch(err => {
        throw err;
      });
  }

  setUpCloud(env: Obj) {
    const cloud = new CloudInterface(env);
    CloudInterface.setCloud(cloud);
  }
}

export default App;
