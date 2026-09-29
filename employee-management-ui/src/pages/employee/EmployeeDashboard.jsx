import {
  UsersRound,
  User,
  BriefcaseBusiness,
  CalendarDays,
  ShieldCheck,
} from 'lucide-react'

import { useAuth } from '../../context/AuthContext'

function EmployeeDashboard() {

  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <UsersRound size={21} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                PeoplePulse
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                Employee Dashboard
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {user?.name || 'Employee'}
              </p>

              <p className="text-xs text-slate-500">
                Employee
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
              {user?.name?.charAt(0)?.toUpperCase() || 'E'}
            </div>

          </div>

        </div>
      </nav>

      {/* Main */}

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Welcome */}

        <div className="mb-8 rounded-2xl bg-indigo-600 p-7 text-white shadow-lg shadow-indigo-100">

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

            <div>

              <p className="text-sm font-medium text-indigo-200">
                EMPLOYEE PORTAL
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Welcome, {user?.name || 'Employee'}!
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100">
                View your employee information and manage your
                personal profile from one place.
              </p>

            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <User size={30} />
            </div>

          </div>

        </div>

        {/* Cards */}

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <User size={21} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              My Profile
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              View and update your personal information.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <BriefcaseBusiness size={21} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Job Information
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              View your department, designation and employment details.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <CalendarDays size={21} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Joining Details
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Keep track of your employment information.
            </p>

          </div>

        </div>

        {/* Security */}

        <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
              <ShieldCheck size={20} />
            </div>

            <div>

              <h3 className="font-bold text-slate-900">
                Secure Account
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Your account is protected using JWT authentication
                and role-based access control.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default EmployeeDashboard