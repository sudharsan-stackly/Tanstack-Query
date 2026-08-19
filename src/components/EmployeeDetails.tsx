import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "../api/employeeApi";

interface Props {
  employeeId: string;
  onClose: () => void;
}

function EmployeeDetails({
  employeeId,
  onClose,
}: Props) {
  const {
    data: employee,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => getEmployeeById(employeeId),
    enabled: !!employeeId,
  });

  if (isLoading) {
    return <p>Loading employee details...</p>;
  }

  if (isError || !employee) {
    return <p>Employee not found.</p>;
  }

  return (
    <div className="details">
      <button onClick={onClose}>Close</button>

      <h2>{employee.name}</h2>

      <p>Employee ID: {employee.employeeId}</p>
      <p>Email: {employee.email}</p>
      <p>Department: {employee.department}</p>
      <p>Designation: {employee.designation}</p>
      <p>Status: {employee.status}</p>
    </div>
  );
}

export default EmployeeDetails;