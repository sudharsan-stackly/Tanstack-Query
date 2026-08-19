export interface Employee {
  employeeId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  status: "Active" | "Inactive";
}