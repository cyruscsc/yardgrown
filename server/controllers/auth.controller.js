import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import { signToken } from '../utils/signToken.js';

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json('User created successfully');
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong crendentials'));
    signToken(validUser, res);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { displayName, email, avatar } = req.body;
    const validUser = await User.findOne({ email });
    if (validUser) {
      signToken(validUser, res);
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
      signToken(newUser, res);
    }
  } catch (error) {
    next(error);
  }
};
