'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
          mobile: number,
          email,
          password,
          otp,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Registration successful!')
        router.push('/login')
      } else {
        alert(data.error || 'Registration failed.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-600">
      <div className="bg-white rounded-lg shadow-lg flex w-[90%] max-w-4xl overflow-hidden">
        {/* Left - Register Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6">Register</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-purple-600"
            />

            <input
              type="number"
              placeholder="Mobile-No"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-purple-600"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-purple-600"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-purple-600"
            />

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-purple-600"
            />

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Right - Image and Quote */}
        <div className="hidden md:flex w-1/2 bg-purple-600 text-white items-center justify-center relative">
          <img
            src="/mbetlogo2.jpeg"
            alt="register visual"
            className="absolute inset-0 w-full h-full object-cover opacity-100"
          />
          
        </div>
      </div>
    </div>
  )
}
