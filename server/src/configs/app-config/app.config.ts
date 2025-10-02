import { registerAs } from '@nestjs/config';
import { applicationConfig } from './config';

export default registerAs('app', () => ({
  // General Config
  port: applicationConfig.port,
  frontendUrl: applicationConfig.frontendUrl,

  // Database Config
  database: {
    url: applicationConfig.database.url,
  },
}));
