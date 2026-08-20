import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "../api/employeeApi";

interface EmployeeDetailsProps {
  employeeId: string;
  onClose: () => void;
}

function EmployeeDetails({
  employeeId,
  onClose,
}: EmployeeDetailsProps) {
  const {
    data: employee,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => getEmployeeById(employeeId),
    enabled: !!employeeId,
    retry: 2,
  });

  if (isLoading) {
    return (
      <div className="details">
        <p>Loading employee details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="details">
        <p className="error">
          {error.message}
        </p>

        <button onClick={onClose}>
          Close
        </button>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="details">
        <p>Employee not found.</p>

        <button onClick={onClose}>
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="details">
      <button onClick={onClose}>
        Close
      </button>

      <h2>{employee.name}</h2>

      <p>
        <strong>Employee ID:</strong>{" "}
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
    </div>
  );
}

export default EmployeeDetails;