import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectToLoginDatabase from '../lib/mongodb.js';

const loginSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Hash password before saving
loginSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

let LoginUserModel = null;

export default async function getLoginUserModel() {
  if (!LoginUserModel) {
    const conn = await connectToLoginDatabase();
    // Use consistent model and collection name
    LoginUserModel = conn.models.LoginUser || conn.model('LoginUser', loginSchema, 'loginusers');
  }
  return LoginUserModel;
}
