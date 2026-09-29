import { useEffect, useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  Building2,
  RefreshCw,
} from 'lucide-react'
import api from '../../services/api'

const Departments = () => {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: true,
  })

  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)

  // =========================
  // Load Departments
  // =========================
  const loadDepartments = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await api.get('/departments')

      setDepartments(response.data)
    } catch (err) {
      console.error('Failed to load departments:', err)

      setError(
        err.response?.data?.message ||
          'Failed to load departments.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDepartments()
  }, [])

  // =========================
  // Form Change
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // =========================
  // Add / Update
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setError('Department name is required.')
      return
    }

    try {
      setSaving(true)
      setError('')

      const requestData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        status: formData.status,
      }

      if (editingId) {
        await api.put(
          `/departments/${editingId}`,
          requestData
        )

        alert('Department updated successfully.')
      } else {
        await api.post('/departments', requestData)

        alert('Department created successfully.')
      }

      resetForm()
      loadDepartments()
    } catch (err) {
      console.error('Department save error:', err)

      setError(
        err.response?.data?.message ||
          'Failed to save department.'
      )
    } finally {
      setSaving(false)
    }
  }

  // =========================
  // Edit
  // =========================
  const handleEdit = (department) => {
    setEditingId(department.id)

    setFormData({
      name: department.name || '',
      description: department.description || '',
      status:
        department.status !== undefined
          ? department.status
          : true,
    })

    setShowForm(true)
    setError('')
  }

  // =========================
  // Delete
  // =========================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this department?'
    )

    if (!confirmed) {
      return
    }

    try {
      setError('')

      await api.delete(`/departments/${id}`)

      alert('Department deleted successfully.')

      loadDepartments()
    } catch (err) {
      console.error('Department delete error:', err)

      setError(
        err.response?.data?.message ||
          'Failed to delete department.'
      )
    }
  }

  // =========================
  // Reset Form
  // =========================
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      status: true,
    })

    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 p-2.5 text-white">
            <Building2 className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Departments
            </h1>

            <p className="text-sm text-gray-500">
              Manage employee departments
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadDepartments}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>

          <button
            onClick={() => {
              resetForm()
              setShowForm(true)
            }}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            Add Department
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            {editingId
              ? 'Edit Department'
              : 'Add Department'}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Department Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Information Technology"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Department description..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="departmentStatus"
                checked={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.checked,
                  }))
                }
                className="h-4 w-4"
              />

              <label
                htmlFor="departmentStatus"
                className="text-sm font-medium text-gray-700"
              >
                Active Department
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {saving
                  ? 'Saving...'
                  : editingId
                  ? 'Update Department'
                  : 'Save Department'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Department Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Department
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Description
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {loading && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    Loading departments...
                  </td>
                </tr>
              )}

              {!loading &&
                departments.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-5 py-12 text-center text-sm text-gray-500"
                    >
                      No departments found.
                    </td>
                  </tr>
                )}

              {!loading &&
                departments.map((department) => (
                  <tr
                    key={department.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2">
                          <Building2 className="h-4 w-4 text-gray-600" />
                        </div>

                        <span className="font-medium text-gray-900">
                          {department.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {department.description || '-'}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          department.status
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {department.status
                          ? 'Active'
                          : 'Inactive'}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">

                        <button
                          onClick={() =>
                            handleEdit(department)
                          }
                          className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                          title="Edit Department"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(department.id)
                          }
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                          title="Delete Department"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Departments