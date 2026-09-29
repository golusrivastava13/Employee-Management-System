import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RoleRoute({ allowedRole }) {

  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== allowedRole) {

    if (user.role === 'ADMIN') {
      return <Navigate to="/admin/dashboard" replace />
    }

    return <Navigate to="/employee/dashboard" replace />
  }

  return <Outlet />
}

export default RoleRoute