import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  DollarSign,
  Hash,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import api from '../../services/api'

const EmployeeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await api.get(`/employees/${id}`)
        setEmployee(response.data)
      } catch (err) {
        console.error('Failed to load employee:', err)

        setError(
          err.response?.data?.message ||
            'Failed to load employee details.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadEmployee()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading employee details...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>

          <button
            onClick={() => navigate('/admin/employees')}
            className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Back to Employees
          </button>
        </div>
      </div>
    )
  }

  if (!employee) {
    return null
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={() => navigate('/admin/employees')}
            className="mb-3 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Employees
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            Employee Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View complete employee information
          </p>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium ${
            employee.status === 'ACTIVE'
              ? 'bg-green-100 text-green-700'
              : employee.status === 'ON_LEAVE'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {employee.status?.replace('_', ' ')}
        </span>
      </div>

      {/* Basic Information */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">
            Basic Information
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          <InfoItem
            icon={<Hash className="h-5 w-5" />}
            label="Employee Code"
            value={employee.employeeCode}
          />

          <InfoItem
            icon={<User className="h-5 w-5" />}
            label="Full Name"
            value={`${employee.firstName || ''} ${
              employee.lastName || ''
            }`}
          />

          <InfoItem
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            value={employee.email}
          />

          <InfoItem
            icon={<Phone className="h-5 w-5" />}
            label="Phone"
            value={employee.phone}
          />

          <InfoItem
            icon={<User className="h-5 w-5" />}
            label="Gender"
            value={employee.gender}
          />

          <InfoItem
            icon={<Calendar className="h-5 w-5" />}
            label="Date of Birth"
            value={employee.dateOfBirth}
          />
        </div>
      </div>

      {/* Job Information */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">
            Job Information
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          <InfoItem
            icon={<Building2 className="h-5 w-5" />}
            label="Department"
            value={employee.department?.name}
          />

          <InfoItem
            icon={<Briefcase className="h-5 w-5" />}
            label="Designation"
            value={employee.designation}
          />

          <InfoItem
            icon={<DollarSign className="h-5 w-5" />}
            label="Salary"
            value={
              employee.salary != null
                ? `₹${Number(employee.salary).toLocaleString('en-IN')}`
                : '-'
            }
          />

          <InfoItem
            icon={<Calendar className="h-5 w-5" />}
            label="Joining Date"
            value={employee.joiningDate}
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">
            Address Information
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          <InfoItem
            icon={<MapPin className="h-5 w-5" />}
            label="Address"
            value={employee.address}
          />

          <InfoItem
            icon={<MapPin className="h-5 w-5" />}
            label="City"
            value={employee.city}
          />

          <InfoItem
            icon={<MapPin className="h-5 w-5" />}
            label="State"
            value={employee.state}
          />

          <InfoItem
            icon={<MapPin className="h-5 w-5" />}
            label="Country"
            value={employee.country}
          />
        </div>
      </div>
    </div>
  )
}

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-gray-100 p-2 text-gray-600">
        {icon}
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-gray-900">
          {value || '-'}
        </p>
      </div>
    </div>
  )
}

export default EmployeeDetails