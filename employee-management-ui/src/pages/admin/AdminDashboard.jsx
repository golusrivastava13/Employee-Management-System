import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  CalendarDays,
  Building2,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

import api from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [departmentStats, setDepartmentStats] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsResponse, departmentResponse] =
        await Promise.all([
          api.get("/dashboard/stats"),
          api.get("/dashboard/department-count"),
        ]);

      setStats(statsResponse.data);
      setDepartmentStats(departmentResponse.data);
    } catch (error) {
      console.error("Dashboard Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-2 text-gray-500">
          <RefreshCw className="h-5 w-5 animate-spin" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          <p className="font-semibold">
            Dashboard could not be loaded
          </p>

          <p className="mt-1 text-sm">
            {error}
          </p>

          <button
            onClick={loadDashboard}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Employees",
      value: stats?.totalEmployees ?? 0,
      icon: Users,
      description: "All employees",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Employees",
      value: stats?.activeEmployees ?? 0,
      icon: UserCheck,
      description: "Currently active",
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Inactive Employees",
      value: stats?.inactiveEmployees ?? 0,
      icon: UserX,
      description: "Currently inactive",
      bg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "On Leave",
      value: stats?.employeesOnLeave ?? 0,
      icon: CalendarDays,
      description: "Currently on leave",
      bg: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      title: "Departments",
      value: stats?.totalDepartments ?? 0,
      icon: Building2,
      description: "Organization departments",
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Overview of your employee management system
          </p>
        </div>

        <button
          onClick={loadDashboard}
          className="flex w-fit items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {card.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.bg}`}
                >
                  <Icon
                    className={`h-5 w-5 ${card.iconColor}`}
                  />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                {card.description}
              </p>
            </div>
          );
        })}

      </div>

      {/* Department Statistics */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Employees by Department
            </h2>

            <p className="text-sm text-gray-500">
              Employee distribution across departments
            </p>
          </div>
        </div>

        <div className="p-5">

          {departmentStats.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-500">
              No department data available.
            </div>
          ) : (
            <div className="space-y-5">

              {departmentStats.map((department) => {
                const totalEmployees =
                  stats?.totalEmployees || 0;

                const percentage =
                  totalEmployees > 0
                    ? Math.round(
                        (department.employeeCount /
                          totalEmployees) *
                          100
                      )
                    : 0;

                return (
                  <div key={department.departmentId}>

                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {department.departmentName}
                        </p>

                        <p className="text-xs text-gray-500">
                          {department.employeeCount} employee
                          {department.employeeCount !== 1
                            ? "s"
                            : ""}
                        </p>
                      </div>

                      <span className="text-sm font-semibold text-gray-700">
                        {percentage}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;