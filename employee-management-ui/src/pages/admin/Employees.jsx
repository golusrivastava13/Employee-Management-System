import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UsersRound,
  Search,
  RefreshCw,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Filter,
} from 'lucide-react'

import api from '../../services/api'

function Employees() {

  // Employee data
  const [employees, setEmployees] = useState([])

  const navigate = useNavigate()

  // Loading and error
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Pagination
  const [page, setPage] = useState(0)
  const [size] = useState(10)

  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  // Search
  const [search, setSearch] = useState('')

  // Departments
  const [departments, setDepartments] = useState([])

  // Selected department
  const [departmentId, setDepartmentId] = useState('')

  // Selected status
  const [status, setStatus] = useState('')


  // ==========================================
  // LOAD DEPARTMENTS
  // ==========================================

  const loadDepartments = async () => {

    try {

      const response = await api.get('/departments')

      setDepartments(response.data)

    } catch (error) {

      console.error(
        'Unable to load departments:',
        error
      )

    }
  }


  

  const loadEmployees = async () => {

    try {

      setLoading(true)
      setError('')

      const response = await api.get('/employees', {

        params: {

          page,
          size,

          sortBy: 'id',

          direction: 'DESC',

          search: search || undefined,

          departmentId:
            departmentId || undefined,

          status:
            status || undefined,
        },

      })

      const data = response.data

      setEmployees(data.content)

      setTotalPages(data.totalPages)

      setTotalElements(data.totalElements)

    } catch (error) {

      console.error(error)

      setError(
        error.response?.data?.message ||
        'Unable to load employees.'
      )

    } finally {

      setLoading(false)

    }
  }


  // ==========================================
  // LOAD DEPARTMENTS ON PAGE LOAD
  // ==========================================

  useEffect(() => {

    loadDepartments()

  }, [])


  // ==========================================
  // LOAD EMPLOYEES
  // WHEN PAGE / FILTER CHANGES
  // ==========================================

  useEffect(() => {

    loadEmployees()

  }, [
    page,
    departmentId,
    status,
  ])


  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (event) => {

    event.preventDefault()

    setPage(0)

    loadEmployees()

  }


  // ==========================================
  // RESET FILTERS
  // ==========================================

  const handleReset = () => {

    setSearch('')

    setDepartmentId('')

    setStatus('')

    setPage(0)

  }

  const handleDelete = async (id) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this employee?'
  )

  if (!confirmed) {
    return
  }

  try {
    await api.delete(`/employees/${id}`)

    alert('Employee deleted successfully.')

    loadEmployees()
  } catch (err) {
    console.error('Delete employee error:', err)

    alert(
      err.response?.data?.message ||
        'Failed to delete employee.'
    )
  }
}
const handleStatusChange = async (id, newStatus) => {
  try {
    setError('')

    await api.patch(`/employees/${id}/status`, null, {
      params: {
        status: newStatus,
      },
    })

    alert('Employee status updated successfully.')

    loadEmployees()
  } catch (err) {
    console.error('Status update error:', err)

    setError(
      err.response?.data?.message ||
        'Something went wrong. Please try again.'
    )
  }
}


  return (

    <div className="p-5 sm:p-6 lg:p-8">


      {/* ==========================================
          PAGE HEADER
          ========================================== */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>

          <p className="mb-2 text-sm font-semibold text-indigo-600">
            EMPLOYEE MANAGEMENT
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Employees
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your organization's employees.
          </p>

        </div>


        <button
          onClick={() => navigate('/admin/employees/add')}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
        >

          <Plus size={18} />

          Add Employee

        </button>

      </div>


      {/* ==========================================
          SEARCH + FILTER SECTION
          ========================================== */}

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">


        {/* SEARCH */}

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-3 lg:flex-row">


            {/* SEARCH FORM */}

            <form
              onSubmit={handleSearch}
              className="flex flex-1 gap-3"
            >

              <div className="relative flex-1">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search by name, email or employee code..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />

              </div>


              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >

                Search

              </button>

            </form>


            {/* RESET BUTTON */}

            <button
              onClick={handleReset}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >

              <RefreshCw
                size={17}
                className={
                  loading
                    ? 'animate-spin'
                    : ''
                }
              />

              Reset

            </button>

          </div>


          {/* ==========================================
              FILTERS
              ========================================== */}

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">


            {/* FILTER LABEL */}

            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">

              <Filter size={17} />

              Filters

            </div>


            {/* ==========================================
                DEPARTMENT FILTER
                ========================================== */}

            <select
              value={departmentId}
              onChange={(event) => {

                setDepartmentId(
                  event.target.value
                )

                setPage(0)

              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >

              <option value="">
                All Departments
              </option>


              {departments.map(
                (department) => (

                  <option
                    key={department.id}
                    value={department.id}
                  >
                    {department.name}
                  </option>

                )
              )}

            </select>


            {/* ==========================================
                STATUS FILTER
                ========================================== */}

            <select
              value={status}
              onChange={(event) => {

                setStatus(
                  event.target.value
                )

                setPage(0)

              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >

              <option value="">
                All Status
              </option>

              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>

              <option value="ON_LEAVE">
                On Leave
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* ==========================================
          ERROR MESSAGE
          ========================================== */}

      {error && (

        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

          {error}

        </div>

      )}


      {/* ==========================================
          EMPLOYEE TABLE
          ========================================== */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">


        {/* TABLE HEADER */}

        <div className="border-b border-slate-200 px-6 py-5">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Employee List
              </h2>

              <p className="mt-1 text-sm text-slate-500">

                {totalElements} employee
                {totalElements !== 1
                  ? 's'
                  : ''} found

              </p>

            </div>


            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

              <UsersRound size={21} />

            </div>

          </div>

        </div>


        {/* ==========================================
            LOADING
            ========================================== */}

        {loading ? (

          <div className="space-y-3 p-6">

            <div className="h-14 animate-pulse rounded-xl bg-slate-100" />

            <div className="h-14 animate-pulse rounded-xl bg-slate-100" />

            <div className="h-14 animate-pulse rounded-xl bg-slate-100" />

          </div>

        ) : employees.length === 0 ? (

          /* ==========================================
             NO EMPLOYEES
             ========================================== */

          <div className="px-6 py-16 text-center">

            <UsersRound
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No employees found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          /* ==========================================
             TABLE
             ========================================== */

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">


              {/* TABLE HEAD */}

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Employee
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Code
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Department
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Designation
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>

                </tr>

              </thead>


              {/* TABLE BODY */}

              <tbody className="divide-y divide-slate-100">


                {employees.map(
                  (employee) => (

                    <tr
                      key={employee.id}
                      className="transition hover:bg-slate-50"
                    >


                      {/* EMPLOYEE */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">

                            {employee.firstName
                              ?.charAt(0)
                              ?.toUpperCase()}

                          </div>


                          <div>

                            <p className="font-semibold text-slate-800">

                              {employee.firstName}{' '}

                              {employee.lastName}

                            </p>

                            <p className="text-xs text-slate-500">

                              {employee.email}

                            </p>

                          </div>

                        </div>

                      </td>


                      {/* EMPLOYEE CODE */}

                      <td className="px-6 py-4">

                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">

                          {employee.employeeCode}

                        </span>

                      </td>


                      {/* DEPARTMENT */}

                      <td className="px-6 py-4 text-sm font-medium text-slate-700">

                        {employee.departmentName}

                      </td>


                      {/* DESIGNATION */}

                      <td className="px-6 py-4 text-sm text-slate-600">

                        {employee.designation}

                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <select
  value={employee.status}
  onChange={(e) =>
    handleStatusChange(employee.id, e.target.value)
  }
  className={`rounded-lg border px-3 py-1.5 text-sm font-medium outline-none ${
    employee.status === 'ACTIVE'
      ? 'border-green-200 bg-green-50 text-green-700'
      : employee.status === 'ON_LEAVE'
      ? 'border-yellow-200 bg-yellow-50 text-yellow-700'
      : 'border-red-200 bg-red-50 text-red-700'
  }`}
>
  <option value="ACTIVE">Active</option>
  <option value="INACTIVE">Inactive</option>
  <option value="ON_LEAVE">On Leave</option>
</select>

                      </td>


                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">


                          {/* VIEW */}

                          <button
                          onClick={() => navigate(`/admin/employees/${employee.id}`)}
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                          title="View Employee"
                        >
                         <Eye className="h-4 w-4" />
                        </button>


                          {/* EDIT */}

                          <button
                             onClick={() =>
                             navigate(`/admin/employees/edit/${employee.id}`)
                            }
                            className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                            title="Edit Employee"
                            >
                             <Pencil className="h-4 w-4" />
                            </button>


                          {/* DELETE */}

                          <button
                            onClick={() => handleDelete(employee.id)}
                            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                            title="Delete Employee"
                           >
                           <Trash2 className="h-4 w-4" />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}


        {/* ==========================================
            PAGINATION
            ========================================== */}

        {!loading &&
          employees.length > 0 && (

            <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">


              <p className="text-sm text-slate-500">

                Page {page + 1} of {totalPages}

              </p>


              <div className="flex gap-2">


                {/* PREVIOUS */}

                <button
                  disabled={page === 0}
                  onClick={() =>
                    setPage(page - 1)
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  Previous

                </button>


                {/* NEXT */}

                <button
                  disabled={
                    page >= totalPages - 1
                  }
                  onClick={() =>
                    setPage(page + 1)
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  Next

                </button>

              </div>

            </div>

          )}

      </div>

    </div>

  )
}

export default Employees