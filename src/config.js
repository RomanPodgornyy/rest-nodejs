const uuid = require('uuid');

module.exports = {
  port: process.env.PORT || 3000,
  ACCESS_SECRET_KEY: uuid.v4(),
  ACCESS_EXPIRED_TIME: '10m',
  REFRESH_SECRET_KEY: uuid.v4(),
  REFRESH_EXPIRED_TIME: '15m',
};
