require('dotenv').config();
export const applicationConfig = {
  port: parseInt(process.env[`APP_PORT`], 10) || 3003,
  frontendUrl: process.env[`FRONTEND_URL`],
  database: {
    url: process.env[`DATABASE_URL`],
  },
}