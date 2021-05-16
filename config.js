const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  PORT: process.env.PORT || 8000,
  DBUri: process.env.DB_URI,
  secretKey: process.env.SECRET_KEY,
  authTokenPrefix: process.env.AUTH_TOKEN_PREFIX
};
