const jwt = require('jsonwebtoken');
const { authTokenPrefix, secretKey } = require('../config');

const getTokenValue = (authHeaders) => {
  if (!authHeaders) {
    return null;
  }
  
  const headersArray = authHeaders.split(' ');
  if (headersArray.length !== 2) {
    return null;
  }
  if (headersArray[0] !== authTokenPrefix) {
    return null;
  }
  return headersArray[1];
}

const auth = (req, res, next) => {
  let token = req.header('Authorization');
  token = getTokenValue(token);
  if (!token) {
    return res.status(401).send({error: 'Invalid token!'});
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.id;
  } catch (error) {
    return res.status(401).send({error: 'Invalid token!'});
  }
  next();
}

module.exports = auth;