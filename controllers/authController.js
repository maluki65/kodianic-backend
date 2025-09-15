const User = require('../models/usersModel');
const createError = require('../utils/appError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// On creating jwt token 
const signToken = (id) => {
  return jwt.sign({ id }, 'secretkey123', {
    expiresIn: '7d',
  });
};

// On creating helper function to send token in cookie
const creatSendToken = (user, statuCode, res) => {
  const token = signToken(user._id);
  const csrfToken = crypto.randomBytes(32).toString('hex');

  //On setting cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res.cookie('jwt', token, cookieOptions);

  // CSRF cookie
  res.cookie('csrfToken', csrfToken, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  });

  res.status(statuCode).json({
    status: 'success',
    message: statuCode === 201 ? 'User registered successfully' : 'User logged in successfully',
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    csrfToken,
  });
};

// On registering new users
exports.signup = async (req, res, next) => {
  try{
    const userExists = await User.findOne({ email: req.body.email});
    if (userExists) {
      return next(new createError('User with email already exists!', 400));
    }

    if (!req.body.email) {
      return next(new createError('Email is required!', 400));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    creatSendToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

//On loggin in
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) return next (new createError('User does not exist!', 404));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next (new createError('Invaid password or email', 401));
    }

    creatSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// On logging out (clear cookies info)
exports.logout = (req, res) => {
  res.clearCookie('jwt', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none',
});

  res.status(200).json({
    status: 'success',
    message: 'logged out successfully',
  });
};

// On creating sessions
exports.getProfile = async (req, res, next) => {
  try {
    const user  = await User.findOne(req.user.id).select('-password');
    if (!user) {
      return next(new createError('User not found', 404));
    }

    res.status(200).json({
      status: 'Success',
      user,
    });
  } catch (error) { 
    next(error);
  }
};