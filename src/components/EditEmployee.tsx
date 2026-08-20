import { useEffect, useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateEmployee } from "../api/employeeApi";
import type { Employee } from "../types/employee";

interface EditEmployeeProps {
  employee: Employee;
  onClose: () => void;
}

function EditEmployee({
  employee,
  onClose,
}: EditEmployeeProps) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<Employee>(employee);

  useEffect(() => {
    setForm(employee);
  }, [employee]);

  const mutation = useMutation({
    mutationFn: updateEmployee,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });

      queryClient.invalidateQueries({
        queryKey: ["employee", employee.employeeId],
      });

      onClose();
    },

    onError: (error) => {
      console.error(
        "Failed to update employee:",
        error
      );
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
    <div className="edit-container">
      <h2>Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="employeeId"
          value={form.employeeId}
          disabled
        />

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          required
        />

        <input
          name="designation"
          value={form.designation}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>

        <button
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending
            ? "Updating..."
            : "Update Employee"}
        </button>

        <button
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>

      {mutation.isError && (
        <p className="error">
          {mutation.error.message}
        </p>
      )}
    </div>
  );
}

export default EditEmployee;