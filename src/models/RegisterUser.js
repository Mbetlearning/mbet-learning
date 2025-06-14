import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const registerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  mobile: { type: String, required: true, length: 10 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

registerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.models.RegisterUser || mongoose.model('RegisterUser', registerSchema, 'registerusers');
