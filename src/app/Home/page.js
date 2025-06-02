'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/login')
    }
  }, [])
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold text-blue-700">Welcome to MBET Learning Platform</h1>
      <p className="mt-4 text-lg text-gray-600">Start your journey with top online courses!</p>
    </div>
  )
}
