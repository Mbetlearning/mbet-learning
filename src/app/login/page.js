'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
      body: JSON.stringify({ username, password}),
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
    <div className="flex items-center justify-center min-h-screen bg-red-400 relative">
      <button
        onClick={() => router.push('/register')}
        className="absolute top-6 left-6 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
      >
        ← Go to Register
      </button>

      <form
        onSubmit={handleLogin}
        className="bg-green-400 p-6 rounded-xl shadow-md space-y-4 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="bg-blue-500 w-full px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-blue-500 w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-black py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}
