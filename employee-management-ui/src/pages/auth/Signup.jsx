import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  UserPlus,
  UsersRound,
  Mail,
  Phone,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'

import { useAuth } from '../../context/AuthContext'

function Signup() {

  const navigate = useNavigate()
  const { signup } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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
    setSuccess('')

    if (formData.password !== formData.confirmPassword) {
      setError('Password and confirm password do not match.')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError('Phone number must contain exactly 10 digits.')
      return
    }

    setLoading(true)

    try {

      await signup(formData)

      setSuccess(
        'Account created successfully! Redirecting to login...'
      )

      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      })

      setTimeout(() => {
        navigate('/login')
      }, 1500)

    } catch (error) {

      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError('Registration failed. Please try again.')
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
                Build a better
                <span className="block text-indigo-200">
                  workplace.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">
                Join PeoplePulse and manage your employee
                information with a simple, secure and modern platform.
              </p>

              <div className="mt-10 space-y-4">

                <div className="flex items-center gap-3 text-indigo-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <UsersRound size={17} />
                  </div>
                  Easy employee management
                </div>

                <div className="flex items-center gap-3 text-indigo-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <ShieldCheck size={17} />
                  </div>
                  Secure role-based access
                </div>

                <div className="flex items-center gap-3 text-indigo-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <ArrowRight size={17} />
                  </div>
                  Simple and intuitive dashboard
                </div>

              </div>

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

            <div className="mb-7">

              <p className="mb-2 text-sm font-semibold text-indigo-600">
                GET STARTED
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Create your PeoplePulse employee account.
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

            {/* Success */}

            {success && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

                <CheckCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>{success}</span>

              </div>
            )}

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Name */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                </div>

              </div>

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

              {/* Phone */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>

                <div className="relative">

                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
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
                    placeholder="Create a password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                </div>

                <p className="mt-1.5 text-xs text-slate-400">
                  Minimum 8 characters
                </p>

              </div>

              {/* Confirm Password */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                </div>

              </div>

              {/* Button */}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  'Creating account...'
                ) : (
                  <>
                    <UserPlus size={18} />
                    Create Account
                  </>
                )}

              </button>

            </form>

            {/* Login */}

            <p className="mt-7 text-center text-sm text-slate-500">

              Already have an account?{' '}

              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Login
              </Link>

            </p>

            <div className="mt-4 text-center">

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

export default Signup