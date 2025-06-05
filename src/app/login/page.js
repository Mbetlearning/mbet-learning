'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock } from 'lucide-react'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Login successful!')
        localStorage.setItem('isLoggedIn', 'true')
        router.push('/courses')
      } else {
        alert(data.error || 'Login failed')
        setPassword('')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Something went wrong during login.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-600">
      <div className="bg-white rounded-lg shadow-lg flex w-[90%] max-w-4xl overflow-hidden">
        {/* Left - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-purple-600" size={20} />
              <input
                type="text"
                placeholder="Enter your email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-purple-600" size={20} />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="text-sm text-purple-600 hover:underline cursor-pointer">
              Forgot password?
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{' '}
            <Link href="/register" className="text-purple-600 hover:underline">
              Signup now
            </Link>
          </p>
        </div>

        {/* Right - Image and Quote */}
        <div className="hidden md:flex w-1/2 bg-purple-600 text-white items-center justify-center relative">
          <img
            src="/mbetlogo2.jpeg"
            alt="login visual"
            className="absolute inset-0 w-full h-full object-cover opacity-100"
          />
         
        </div>
      </div>
    </div>
  )
}
