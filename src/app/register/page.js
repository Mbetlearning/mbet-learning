'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')

  useEffect(() => {
    if (number.trim().length === 10) {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedOtp(newOtp)
      alert(`Fake OTP sent to mobile: ${newOtp}`) // Simulated OTP send
      console.log('OTP sent:', newOtp)
    }
  }, [number])

  const handleRegister = async (e) => {
    e.preventDefault()

    // Basic frontend validation
    if (!username || !number || !email || !password || !otp) {
      alert('All fields are required.')
      return
    }

    if (number.trim().length !== 10) {
      alert('Mobile number must be 10 digits.')
      return
    }

    if (otp.trim() !== generatedOtp) {
      alert('Invalid OTP.')
      return
    }

    try {
      const response = await fetch('/api/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
  username,
  mobile: number, // ✅ match backend expectation
  email,
  password,
  otp,
}),

});
      const data = await response.json()

      if (response.ok) {
        alert('Registration successful!')
      //  router.push('/login')
      } else {
        alert(data.error || 'Registration failed.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-400 relative">
      <button
        onClick={() => router.push('/login')}
        className="absolute top-6 right-6 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
      >
        Go to Login →
      </button>

      <form
        onSubmit={handleRegister}
        className="bg-green-400 p-6 rounded-xl shadow-md space-y-4 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="bg-gray-400 w-full px-4 py-2 border rounded-md"
        />

        <input
          type="number"
          placeholder="Mobile-No"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className="bg-gray-400 w-full px-4 py-2 border rounded-md"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-400 w-full px-4 py-2 border rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-400 w-full px-4 py-2 border rounded-md"
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="bg-gray-400 w-full px-4 py-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-black py-2 rounded-md hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  )
}
