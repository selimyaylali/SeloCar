import { Schema, model } from 'mongoose';
import Counter from './Counter.js';

const userSchema = new Schema({
  userID: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  country: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  }
});

userSchema.pre('save', async function(next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'userIdCounter' }, 
      { $inc: { seq: 1 } }, 
      { new: true, upsert: true }
    );
    this.userID = counter.seq;
  }
  next();
});

const User = model('User', userSchema);

export default User;
