import crypto from 'crypto';
import jwt from 'jsonwebtoken';

type User = {
    _id: string;
    email: string;
    hash: string;
    salt: string;
}

export const setPassword = function(user: User, password: string) {
  user.salt = crypto.randomBytes(16).toString('hex');
  user.hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
};

export const validatePassword = function(user: User, password: string) {
  const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
  return user.hash === hash;
};

export const generateJWT = function(user: User) {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: user.email,
    id: user._id,
    exp: Math.round(expirationDate.getTime() / 1000),
  }, 'secret');
}

export const toAuthJSON = function(user: User) {
  return {
    _id: user._id,
    email: user.email,
    token: generateJWT(user),
  };
};
