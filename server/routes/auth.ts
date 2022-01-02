
import jwt, { GetTokenCallback } from 'express-jwt';

const getTokenFromHeaders: GetTokenCallback = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: jwt({
    algorithms: ['sha1', 'RS256', 'HS256'],
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    algorithms: ['sha1', 'RS256', 'HS256'],
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};
export default auth;