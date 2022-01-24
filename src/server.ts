import dotenv from 'dotenv';

dotenv.config();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

import { application } from './config';

application();
