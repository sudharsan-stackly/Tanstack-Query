import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { addEmployee } from "../api/employeeApi";
import type { Employee } from "../types/employee";

function AddEmployee() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<Employee>({
    employeeId: "",
    name: "",
    email: "",
    department: "",
    designation: "",
    status: "Active",
  });

  const mutation = useMutation({
    mutationFn: addEmployee,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });

      setForm({
        employeeId: "",
        name: "",
        email: "",
        department: "",
        designation: "",
        status: "Active",
      });
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    mutation.mutate(form);
  };

  return (
    <div className="form-container">
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="employeeId"
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={handleChange}
          required
        />

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />

        <input
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending
            ? "Adding..."
            : "Add Employee"}
        </button>
      </form>

      {mutation.isSuccess && (
        <p className="success">
          Employee added successfully.
        </p>
      )}

      {mutation.isError && (
        <p className="error">
          Failed to add employee.
        </p>
      )}
    </div>
  );
}

export default AddEmployee;