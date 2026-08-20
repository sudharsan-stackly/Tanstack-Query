import type { Employee } from "../types/employee";

let employees: Employee[] = [
  {
    employeeId: "EMP001",
    name: "Praveen",
    email: "praveen@onecloud.com",
    department: "Engineering",
    designation: "Software Engineer",
    status: "Active",
  },
  {
    employeeId: "EMP002",
    name: "Rahul",
    email: "rahul@onecloud.com",
    department: "Finance",
    designation: "Financial Analyst",
    status: "Active",
  },
  {
    employeeId: "EMP003",
    name: "Arun",
    email: "arun@onecloud.com",
    department: "Human Resources",
    designation: "HR Executive",
    status: "Inactive",
  },
  {
    employeeId: "EMP004",
    name: "Karthik",
    email: "karthik@onecloud.com",
    department: "Engineering",
    designation: "Frontend Developer",
    status: "Active",
  },
  {
    employeeId: "EMP005",
    name: "Divya",
    email: "divya@onecloud.com",
    department: "Marketing",
    designation: "Marketing Executive",
    status: "Active",
  },
  {
    employeeId: "EMP006",
    name: "Vignesh",
    email: "vignesh@onecloud.com",
    department: "Engineering",
    designation: "Backend Developer",
    status: "Active",
  },
  {
    employeeId: "EMP007",
    name: "Swetha",
    email: "swetha@onecloud.com",
    department: "Finance",
    designation: "Accountant",
    status: "Inactive",
  },
  {
    employeeId: "EMP008",
    name: "Ajay",
    email: "ajay@onecloud.com",
    department: "Sales",
    designation: "Sales Executive",
    status: "Active",
  },
  {
    employeeId: "EMP009",
    name: "Nithya",
    email: "nithya@onecloud.com",
    department: "Human Resources",
    designation: "HR Manager",
    status: "Active",
  },
  {
    employeeId: "EMP010",
    name: "Sanjay",
    email: "sanjay@onecloud.com",
    department: "Engineering",
    designation: "Full Stack Developer",
    status: "Active",
  },
];

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getEmployees = async (): Promise<Employee[]> => {
  await delay(800);

  return [...employees];
};

export const getEmployeeById = async (
  employeeId: string
): Promise<Employee | undefined> => {
  await delay(500);

  return employees.find(
    (employee) => employee.employeeId === employeeId
  );
};

export const addEmployee = async (
  employee: Employee
): Promise<Employee> => {
  await delay(500);

  const employeeExists = employees.some(
    (item) => item.employeeId === employee.employeeId
  );

  if (employeeExists) {
    throw new Error("Employee ID already exists");
  }

  employees = [...employees, employee];

  return employee;
};

export const updateEmployee = async (
  employee: Employee
): Promise<Employee> => {
  await delay(500);

  const employeeExists = employees.some(
    (item) => item.employeeId === employee.employeeId
  );

  if (!employeeExists) {
    throw new Error("Employee not found");
  }

  employees = employees.map((item) =>
    item.employeeId === employee.employeeId
      ? employee
      : item
  );

  return employee;
};

export const deleteEmployee = async (
  employeeId: string
): Promise<string> => {
  await delay(500);

  const employeeExists = employees.some(
    (employee) => employee.employeeId === employeeId
  );

  if (!employeeExists) {
    throw new Error("Employee not found");
  }

  employees = employees.filter(
    (employee) => employee.employeeId !== employeeId
  );

  return employeeId;
};