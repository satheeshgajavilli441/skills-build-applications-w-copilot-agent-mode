import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    age: Number,
  },
  { collection: 'users', strict: false },
);

export default model('User', userSchema);