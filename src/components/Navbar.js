// components/Navbar.jsx
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link href="/" className="text-xl font-bold">MBET Learning</Link>
      <div className="space-x-4">
         <Link href="/Home">Home</Link>
        <Link href="/courses">Courses</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
       
      </div>
    </nav>
  )
}
