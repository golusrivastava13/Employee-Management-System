import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Employees from './pages/admin/Employees'

import AdminDashboard from './pages/admin/AdminDashboard'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'

import AdminLayout from './layouts/AdminLayout'

import ProtectedRoute from './routes/ProtectedRoute'
import RoleRoute from './routes/RoleRoute'
import AddEmployee from './pages/admin/AddEmployee'
import EmployeeDetails from './pages/admin/EmployeeDetails'
import EditEmployee from './pages/admin/EditEmployee'
import Departments from './pages/admin/Departments'
import MyProfile from './pages/profile/MyProfile'

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>

          {/* ADMIN */}

          <Route element={<RoleRoute allowedRole="ADMIN" />}>

            <Route element={<AdminLayout />}>

              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />
              <Route
                path="/admin/employees"
                element={<Employees />}
              />
              <Route
                path="/admin/employees/add"
                element={<AddEmployee />}
              />
              <Route
                path="/admin/employees/:id"
                element={<EmployeeDetails />}
              />
              <Route
                path="/admin/employees/edit/:id"
                element={<EditEmployee />}
              />
              <Route
                path="/admin/departments"
                element={<Departments />}
              />
              <Route
                path="/admin/profile"
                element={<MyProfile />}
              />
              

            </Route>

          </Route>


          {/* EMPLOYEE */}

          <Route element={<RoleRoute allowedRole="EMPLOYEE" />}>

            <Route
              path="/employee/dashboard"
              element={<EmployeeDashboard />}
            />

          </Route>

        </Route>


        {/* Unknown Route */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App