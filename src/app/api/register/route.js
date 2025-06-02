import connectToDatabase from '../../../lib/mongodb';
import RegisterUser from '../../../models/RegisterUser';

export async function POST(req) {
  try {
    await connectToDatabase();
    const { username, email, password, mobile } = await req.json();

    if (!username || !email || !password || !mobile) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    const existingUser = await RegisterUser.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    // ✅ Only save in registration collection
    const newRegisterUser = new RegisterUser({ username, email, password, mobile });
    await newRegisterUser.save();

    return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });

  } catch (err) {
    console.error('Registration error:', err.message);
    return new Response(JSON.stringify({ message: 'Registration failed', error: err.message }), { status: 500 });
  }
}
