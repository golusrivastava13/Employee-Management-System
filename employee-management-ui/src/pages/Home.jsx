import {
  ArrowRight,
  BarChart3,
  ShieldCheck,
  UsersRound,
  CheckCircle2
} from 'lucide-react'

import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">

        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:py-28">

          {/* Left */}
          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              Smart Employee Management Platform
            </div>

            <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">

              Manage your
              <span className="text-indigo-600"> people </span>
              with confidence.

            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">

              PeoplePulse helps organizations manage employees,
              departments, profiles and workforce insights from
              one simple platform.

            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/login"
                className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Go to Dashboard

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />

              </Link>

              <Link
                to="/signup"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                Create Account
              </Link>

            </div>

            {/* Trust points */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={18}
                  className="text-emerald-500"
                />
                Secure authentication
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={18}
                  className="text-emerald-500"
                />
                Role-based access
              </div>

            </div>

          </div>

          {/* Right dashboard preview */}
          <div className="relative">

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200">

              {/* Browser top */}
              <div className="mb-5 flex items-center justify-between">

                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-300" />
                  <span className="h-3 w-3 rounded-full bg-yellow-300" />
                  <span className="h-3 w-3 rounded-full bg-green-300" />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  PeoplePulse Dashboard
                </span>

              </div>

              {/* Dashboard */}
              <div className="rounded-2xl bg-slate-50 p-5">

                <div className="mb-5 flex items-center justify-between">

                  <div>
                    <p className="text-xs text-slate-500">
                      Overview
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      Workforce
                    </h3>
                  </div>

                  <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                    <BarChart3 size={22} />
                  </div>

                </div>

                <div className="grid grid-cols-3 gap-3">

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-slate-500">
                      Employees
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      124
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-slate-500">
                      Active
                    </p>

                    <p className="mt-2 text-2xl font-bold text-emerald-600">
                      110
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-slate-500">
                      Leave
                    </p>

                    <p className="mt-2 text-2xl font-bold text-orange-500">
                      8
                    </p>
                  </div>

                </div>

                <div className="mt-4 rounded-xl bg-white p-5 shadow-sm">

                  <div className="mb-4 flex items-center gap-2">
                    <UsersRound
                      size={18}
                      className="text-indigo-600"
                    />

                    <span className="font-semibold text-slate-800">
                      Departments
                    </span>
                  </div>

                  <div className="space-y-4">

                    <div>
                      <div className="mb-1 flex justify-between text-xs">
                        <span>IT</span>
                        <span>52</span>
                      </div>

                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 w-[75%] rounded-full bg-indigo-600" />
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 flex justify-between text-xs">
                        <span>HR</span>
                        <span>28</span>
                      </div>

                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 w-[45%] rounded-full bg-blue-500" />
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 flex justify-between text-xs">
                        <span>Finance</span>
                        <span>18</span>
                      </div>

                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 w-[30%] rounded-full bg-violet-500" />
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="mx-auto max-w-2xl text-center">

            <p className="font-semibold text-indigo-600">
              Everything in one place
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Built for modern teams
            </h2>

            <p className="mt-4 text-slate-600">
              Simple tools to manage your workforce efficiently.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <FeatureCard
              icon={<UsersRound size={24} />}
              title="Employee Management"
              description="Create, update, search and manage employee records from one place."
            />

            <FeatureCard
              icon={<BarChart3 size={24} />}
              title="Smart Dashboard"
              description="Get quick insights into employee status and department distribution."
            />

            <FeatureCard
              icon={<ShieldCheck size={24} />}
              title="Secure Access"
              description="JWT authentication and role-based authorization protect your data."
            />

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

          <div>
            <p className="font-bold text-slate-900">
              PeoplePulse
            </p>

            <p className="text-sm text-slate-500">
              Smart Employee Management Platform
            </p>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 PeoplePulse. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 leading-7 text-slate-600">
        {description}
      </p>

    </div>
  )
}

export default Home