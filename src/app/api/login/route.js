import getLoginUserModel from '../../../models/LoginUser.js';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Missing username or password' }), { status: 400 });
    }

    const User = await getLoginUserModel();

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newLogin = new User({ username, password: hashedPassword });
    await newLogin.save();

    return new Response(JSON.stringify({ message: 'Login information saved (not validated)' }), { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
