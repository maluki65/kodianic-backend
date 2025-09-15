const jwt = require('jsonwebtoken');
const createError = require('../utils/appError');

exports.protect = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new createError('You are not logged in!', 401));
  }

  try {
    const decoded = jwt.verify(token, 'secretkey123');
    req.user = decoded;
    next();
  } catch (error) {
    return next (new createError('Invalid or expired token', 401));
  }
};

exports.csrfProtection = (req, res, next) => {
  const csrfCookie = req.cookies.csrfToken;
  const csrfHeader = req.headers['x-csrf-token'];

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return next (new createError('Invalid CSRF token!', 403));
  }

  next();
};