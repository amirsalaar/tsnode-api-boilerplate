import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import cors from 'cors';
import YAML from 'yamljs';
import { logger } from '../app/utils';
import { config } from './';

// let schema = require('../schema/schema').schema

// import {schema as schema} from '../schema/schema

export const application = () => {
  // Initialize express app
  const app = express();

  // Setting application local variables
  app.locals.title = config.app.title;
  app.locals.description = config.app.description;

  // Showing stack errors
  app.set('showStackError', true);

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Enable logger (morgan)
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
  }

  // Request body parsing middleware should be above methodOverride
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());
  // app.use(methodOverride());

  // Use helmet to secure Express headers
  // app.use(helmet.frameguard());
  app.use(
    helmet({
      frameguard: false,
    }),
  );
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.disable('x-powered-by');

  app.use(cors());
  app.use(express.json());
  app.use(logger);

  app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.removeHeader('X-Frame-Options');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  if (config.toggle.apidoc) {
    const swaggerDocument = YAML.load(
      path.join(__dirname, '../../apidoc.yaml'),
    );
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  // Config Public Folder for Static Content
  app.use(express.static(path.join(__dirname, '../public')));

  // Return Express server instance
  return app.listen(config.port, () => {
    console.log(
      `${config.app.title} started on ${config.hostname} : ${config.port} in ${
        process.env.NODE_ENV
      } mode on ${new Date().toISOString()}`,
    );
  });
};
