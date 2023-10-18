import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

const signInUser = (user, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  const { password: pw, ...rest } = user._doc;
  res
    .cookie('access_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(rest);
};

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully');
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong crendentials'));
    signInUser(validUser, res);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { displayName, email, avatar } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (validUser) {
      signInUser(validUser, res);
    } else {
      const randomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(randomPassword, 10);
      const newUser = new User({
        username:
          displayName.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        avatar,
      });
      newUser.save();
      signInUser(newUser, res);
    }
  } catch (error) {
    next(error);
  }
};
