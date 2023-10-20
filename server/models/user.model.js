import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        'https://api.dicebear.com/7.x/thumbs/svg?seed=YardGrown&backgroundColor=ABC4AA&shapeColor=F3DEBA&scale=70',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
