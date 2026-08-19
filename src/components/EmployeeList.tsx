import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../api/employeeApi";
import EmployeeDetails from "./EmployeeDetails";

function EmployeeList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [department, setDepartment] = useState("All");
  const [selectedEmployeeId, setSelectedEmployeeId] =
    useState<string | null>(null);

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
  });

  if (isLoading) {
    return <h2>Loading employees...</h2>;
  }

  if (isError) {
    return (
      <div>
        <h2>Failed to load employees</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      employee.name.toLowerCase().includes(searchText) ||
      employee.employeeId.toLowerCase().includes(searchText) ||
      employee.department.toLowerCase().includes(searchText);

    const matchesStatus =
      status === "All" || employee.status === status;

    const matchesDepartment =
      department === "All" ||
      employee.department === department;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesDepartment
    );
  });

  const departments = [
    ...new Set(employees.map((employee) => employee.department)),
  ];

  return (
    <div>
      <div className="list-header">
        <h2>Employee Directory</h2>

        <button onClick={() => refetch()}>
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          value={department}
          onChange={(event) =>
            setDepartment(event.target.value)
          }
        >
          <option value="All">All Departments</option>

          {departments.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <p>
        Showing {filteredEmployees.length} of{" "}
        {employees.length} employees
      </p>

      <div className="employee-grid">
        {filteredEmployees.map((employee) => (
          <div
            className="employee-card"
            key={employee.employeeId}
          >
            <h3>{employee.name}</h3>

            <p>
              <strong>ID:</strong> {employee.employeeId}
            </p>

            <p>
              <strong>Email:</strong> {employee.email}
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
              <strong>Status:</strong> {employee.status}
            </p>

            <button
              onClick={() =>
                setSelectedEmployeeId(employee.employeeId)
              }
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedEmployeeId && (
        <EmployeeDetails
          employeeId={selectedEmployeeId}
          onClose={() => setSelectedEmployeeId(null)}
        />
      )}
    </div>
  );
}

export default EmployeeList;