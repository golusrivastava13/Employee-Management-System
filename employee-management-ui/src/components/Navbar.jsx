import { Link } from 'react-router-dom'
import { UsersRound, LogIn, UserPlus } from 'lucide-react'

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <UsersRound size={21} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              PeoplePulse
            </h1>

            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
              Employee Management
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <LogIn size={17} />
            Login
          </Link>

          <Link
            to="/signup"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
          >
            <UserPlus size={17} />
            Get Started
          </Link>

        </div>

      </div>

    </nav>
  )
}

export default Navbar