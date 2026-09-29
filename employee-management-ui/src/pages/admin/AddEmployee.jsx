import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  UserPlus,
  Save,
  AlertCircle,
} from 'lucide-react'

import api from '../../services/api'

function AddEmployee() {

  const navigate = useNavigate()

  const [departments, setDepartments] = useState([])

  const [loading, setLoading] = useState(false)
  const [departmentLoading, setDepartmentLoading] = useState(true)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    employeeCode: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    departmentId: '',
    designation: '',
    salary: '',
    joiningDate: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    status: 'ACTIVE',
  })


  // ==========================================
  // LOAD DEPARTMENTS
  // ==========================================

  const loadDepartments = async () => {

    try {

      setDepartmentLoading(true)

      const response = await api.get('/departments')

      setDepartments(response.data)

    } catch (error) {

      console.error(error)

      setError(
        error.response?.data?.message ||
        'Unable to load departments.'
      )

    } finally {

      setDepartmentLoading(false)

    }
  }


  useEffect(() => {

    loadDepartments()

  }, [])


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

  }


  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = async (event) => {

    event.preventDefault()

    setError('')
    setSuccess('')


    // Basic frontend validation

    if (!formData.employeeCode.trim()) {
      setError('Employee code is required.')
      return
    }

    if (!formData.firstName.trim()) {
      setError('First name is required.')
      return
    }

    if (!formData.lastName.trim()) {
      setError('Last name is required.')
      return
    }

    if (!formData.email.trim()) {
      setError('Email is required.')
      return
    }

    if (!formData.phone.trim()) {
      setError('Phone number is required.')
      return
    }

    if (!formData.departmentId) {
      setError('Please select a department.')
      return
    }

    if (!formData.designation.trim()) {
      setError('Designation is required.')
      return
    }

    if (!formData.salary) {
      setError('Salary is required.')
      return
    }

    if (!formData.joiningDate) {
      setError('Joining date is required.')
      return
    }


    try {

      setLoading(true)


      const requestData = {
        employeeCode: formData.employeeCode.trim(),

        firstName: formData.firstName.trim(),

        lastName: formData.lastName.trim(),

        email: formData.email.trim(),

        phone: formData.phone.trim(),

        gender: formData.gender || null,

        dateOfBirth:
          formData.dateOfBirth || null,

        departmentId:
          Number(formData.departmentId),

        designation:
          formData.designation.trim(),

        salary:
          Number(formData.salary),

        joiningDate:
          formData.joiningDate,

        address:
          formData.address.trim() || null,

        city:
          formData.city.trim() || null,

        state:
          formData.state.trim() || null,

        country:
          formData.country.trim() || null,

        status:
          formData.status,
      }


      await api.post(
        '/employees',
        requestData
      )


      setSuccess(
        'Employee added successfully.'
      )


      setTimeout(() => {

        navigate('/admin/employees')

      }, 1000)


    } catch (error) {

      console.error(error)

      const responseData =
        error.response?.data

      if (
        responseData?.validationErrors
      ) {

        const firstError =
          Object.values(
            responseData.validationErrors
          )[0]

        setError(
          firstError ||
          'Please check the form.'
        )

      } else {

        setError(
          responseData?.message ||
          'Unable to add employee.'
        )

      }

    } finally {

      setLoading(false)

    }

  }


  return (

    <div className="p-5 sm:p-6 lg:p-8">


      {/* ==========================================
          HEADER
          ========================================== */}

      <div className="mb-8">

        <button
          onClick={() =>
            navigate('/admin/employees')
          }
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
        >

          <ArrowLeft size={17} />

          Back to Employees

        </button>


        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">

            <UserPlus size={23} />

          </div>


          <div>

            <p className="text-sm font-semibold text-indigo-600">
              EMPLOYEE MANAGEMENT
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Add Employee
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Create a new employee record.
            </p>

          </div>

        </div>

      </div>


      {/* ==========================================
          SUCCESS MESSAGE
          ========================================== */}

      {success && (

        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">

          {success}

        </div>

      )}


      {/* ==========================================
          ERROR MESSAGE
          ========================================== */}

      {error && (

        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span>
            {error}
          </span>

        </div>

      )}


      {/* ==========================================
          FORM
          ========================================== */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
      >


        {/* ==========================================
            BASIC INFORMATION
            ========================================== */}

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-lg font-bold text-slate-900">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the employee's basic details.
          </p>


          <div className="mt-6 grid gap-5 md:grid-cols-2">


            {/* Employee Code */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Employee Code
              </label>

              <input
                type="text"
                name="employeeCode"
                value={formData.employeeCode}
                onChange={handleChange}
                placeholder="EMP003"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>


            {/* First Name */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>


            {/* Last Name */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>


            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>


            {/* Phone */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                maxLength={10}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>


            {/* Gender */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >

                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            {/* Date of Birth */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Date of Birth
              </label>

              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

          </div>

        </div>


        {/* ==========================================
            JOB INFORMATION
            ========================================== */}

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-lg font-bold text-slate-900">
            Job Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the employee's professional details.
          </p>


          <div className="mt-6 grid gap-5 md:grid-cols-2">


            {/* Department */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Department
              </label>

              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                disabled={departmentLoading}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50"
              >

                <option value="">
                  {departmentLoading
                    ? 'Loading departments...'
                    : 'Select Department'}
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

            </div>


            {/* Designation */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Designation
              </label>

              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Software Developer"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>


            {/* Salary */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Salary
              </label>

              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="45000"
                min="1"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>


            {/* Joining Date */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Joining Date
              </label>

              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>


            {/* Status */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >

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
            ADDRESS INFORMATION
            ========================================== */}

        <div className="p-6">

          <h2 className="text-lg font-bold text-slate-900">
            Address Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the employee's address details.
          </p>


          <div className="mt-6 grid gap-5 md:grid-cols-2">


            {/* Address */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter complete address"
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>


            {/* City */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Bangalore"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>


            {/* State */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Karnataka"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>


            {/* Country */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="India"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

          </div>

        </div>


        {/* ==========================================
            FORM ACTIONS
            ========================================== */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 p-6 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() =>
              navigate('/admin/employees')
            }
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>


          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading ? (

              <>
                <RefreshCw
                  size={17}
                  className="animate-spin"
                />

                Saving...

              </>

            ) : (

              <>
                <Save size={17} />

                Save Employee

              </>

            )}

          </button>

        </div>

      </form>

    </div>

  )
}

export default AddEmployee