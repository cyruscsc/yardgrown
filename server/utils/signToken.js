import jwt from 'jsonwebtoken';

export const signToken = (user, res) => {
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
