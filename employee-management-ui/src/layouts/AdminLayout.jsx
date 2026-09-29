import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  UsersRound,
  Building2,
  UserCircle,
  LogOut,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function AdminLayout() {

  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Employees',
      path: '/admin/employees',
      icon: UsersRound,
    },
    {
      name: 'Departments',
      path: '/admin/departments',
      icon: Building2,
    },
    {
      name: 'My Profile',
      path: '/admin/profile',
      icon: UserCircle,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 transform
          border-r border-slate-200 bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >

        {/* Logo */}

        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <UsersRound size={19} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                PeoplePulse
              </h1>

              <p className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
                Admin Panel
              </p>
            </div>

          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="space-y-1 p-4">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          {menuItems.map((item) => {

            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 rounded-xl px-3 py-3
                  text-sm font-semibold transition
                  ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                  `
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            )
          })}

        </nav>

        {/* Bottom */}

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-4">

          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-slate-800">
                {user?.name || 'Administrator'}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.email || 'Admin'}
              </p>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>

        </div>

      </aside>

      {/* Main Area */}

      <div className="lg:pl-64">

        {/* Top Navbar */}

        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-md sm:px-6">

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <LayoutDashboard size={21} />
          </button>

          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-slate-800">
              Admin Workspace
            </p>
          </div>

          <div className="ml-auto flex items-center gap-3">

            <div className="text-right">

              <p className="text-sm font-semibold text-slate-800">
                {user?.name || 'System Admin'}
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>

            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>

          </div>

        </header>

        {/* Page Content */}

        <main>
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default AdminLayout