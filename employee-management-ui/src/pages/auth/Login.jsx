import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  UsersRound,
  Mail,
  Lock,
  LogIn,
  ShieldCheck,
  UserPlus,
  AlertCircle,
} from 'lucide-react'

import { useAuth } from '../../context/AuthContext'

function Login() {

  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {

    event.preventDefault()

    setError('')
    setLoading(true)

    try {

      const user = await login(
        formData.email,
        formData.password
      )

      if (user.role === 'ADMIN') {
        navigate('/admin/dashboard')
      } else {
        navigate('/employee/dashboard')
      }

    } catch (error) {

      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError('Unable to login. Please check your credentials.')
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="relative hidden overflow-hidden bg-indigo-600 lg:flex lg:flex-col lg:justify-between">

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-500 opacity-50" />

          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-700 opacity-50" />

          <div className="relative z-10 p-10">

            <Link to="/" className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-lg">
                <UsersRound size={23} />
              </div>

              <div>
                <h1 className="text-xl font-bold text-white">
                  PeoplePulse
                </h1>

                <p className="text-[10px] font-medium uppercase tracking-wider text-indigo-200">
                  Employee Management
                </p>
              </div>

            </Link>

            <div className="mt-28 max-w-lg">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-indigo-100 backdrop-blur-sm">
                <ShieldCheck size={17} />
                Secure Employee Platform
              </div>

              <h2 className="text-5xl font-bold leading-tight text-white">
                Welcome
                <span className="block text-indigo-200">
                  back.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">
                Access your PeoplePulse workspace and manage
                your employee information from one place.
              </p>

            </div>

          </div>

          <div className="relative z-10 p-10">
            <p className="text-sm text-indigo-200">
              © 2026 PeoplePulse. Smart Employee Management, Made Simple.
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center px-6 py-10 sm:px-10">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}

            <div className="mb-8 flex items-center justify-center lg:hidden">

              <Link to="/" className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                  <UsersRound size={23} />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    PeoplePulse
                  </h1>

                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                    Employee Management
                  </p>
                </div>

              </Link>

            </div>

            {/* Heading */}

            <div className="mb-8">

              <p className="mb-2 text-sm font-semibold text-indigo-600">
                WELCOME BACK
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Sign in to your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your credentials to access PeoplePulse.
              </p>

            </div>

            {/* Error */}

            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>{error}</span>

              </div>
            )}

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                </div>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  'Signing in...'
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}

              </button>

            </form>

            {/* Signup */}

            <p className="mt-8 text-center text-sm text-slate-500">

              Don't have an account?{' '}

              <Link
                to="/signup"
                className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Create Account
                <UserPlus size={15} />
              </Link>

            </p>

            <div className="mt-5 text-center">

              <Link
                to="/"
                className="text-xs font-medium text-slate-400 transition hover:text-slate-600"
              >
                ← Back to PeoplePulse
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login