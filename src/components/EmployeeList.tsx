import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteEmployee,
  getEmployees,
} from "../api/employeeApi";

import EmployeeDetails from "./EmployeeDetails";
import EditEmployee from "./EditEmployee";

import type { Employee } from "../types/employee";

function EmployeeList() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [department, setDepartment] = useState("All");

  const [selectedEmployeeId, setSelectedEmployeeId] =
    useState<string | null>(null);

  const [editingEmployee, setEditingEmployee] =
    useState<Employee | null>(null);

  const {
    data: employees = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,

    // Optimistic Update
    onMutate: async (employeeId) => {
      await queryClient.cancelQueries({
        queryKey: ["employees"],
      });

      const previousEmployees =
        queryClient.getQueryData<Employee[]>([
          "employees",
        ]);

      queryClient.setQueryData<Employee[]>(
        ["employees"],
        (oldEmployees = []) =>
          oldEmployees.filter(
            (employee) =>
              employee.employeeId !== employeeId
          )
      );

      return { previousEmployees };
    },

    // Restore data if delete fails
    onError: (error, _employeeId, context) => {
      if (context?.previousEmployees) {
        queryClient.setQueryData(
          ["employees"],
          context.previousEmployees
        );
      }

      console.error("Delete failed:", error);
      alert("Failed to delete employee.");
    },

    // Runs after success or error
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });

  const handleDelete = (employeeId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmed) {
      deleteMutation.mutate(employeeId);
    }
  };

  if (isLoading) {
    return <h2>Loading employees...</h2>;
  }

  if (isError) {
    return (
      <div>
        <h2>Failed to load employees.</h2>

        <p className="error">
          {error.message}
        </p>

        <button onClick={() => refetch()}>
          Try Again
        </button>
      </div>
    );
  }

  const filteredEmployees = employees.filter(
    (employee) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(searchText) ||
        employee.employeeId
          .toLowerCase()
          .includes(searchText) ||
        employee.department
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        status === "All" ||
        employee.status === status;

      const matchesDepartment =
        department === "All" ||
        employee.department === department;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment
      );
    }
  );

  const departments = [
    ...new Set(
      employees.map(
        (employee) => employee.department
      )
    ),
  ];

  return (
    <div className="employee-section">
      <div className="list-header">
        <h2>Employee Directory</h2>

        <button onClick={() => refetch()}>
          {isFetching
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>

        <select
          value={department}
          onChange={(event) =>
            setDepartment(event.target.value)
          }
        >
          <option value="All">
            All Departments
          </option>

          {departments.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <p className="employee-count">
        Showing {filteredEmployees.length} of{" "}
        {employees.length} employees
      </p>

      {filteredEmployees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="employee-grid">
          {filteredEmployees.map((employee) => (
            <div
              className="employee-card"
              key={employee.employeeId}
            >
              <h3>{employee.name}</h3>

              <p>
                <strong>ID:</strong>{" "}
                {employee.employeeId}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {employee.email}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {employee.department}
              </p>

              <p>
                <strong>Designation:</strong>{" "}
                {employee.designation}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {employee.status}
              </p>

              <div className="card-buttons">
                <button
                  onClick={() =>
                    setSelectedEmployeeId(
                      employee.employeeId
                    )
                  }
                >
                  View Details
                </button>

                <button
                  onClick={() =>
                    setEditingEmployee(employee)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(employee.employeeId)
                  }
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEmployeeId && (
        <EmployeeDetails
          employeeId={selectedEmployeeId}
          onClose={() =>
            setSelectedEmployeeId(null)
          }
        />
      )}

      {editingEmployee && (
        <EditEmployee
          employee={editingEmployee}
          onClose={() =>
            setEditingEmployee(null)
          }
        />
      )}
    </div>
  );
}

export default EmployeeList;