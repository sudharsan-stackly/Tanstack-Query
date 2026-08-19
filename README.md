# TanStack Query - Employee Management

## Project Overview

This project is created to understand and practice the basic concepts of TanStack Query with React and TypeScript.

The project contains an Employee Management UI where employee data is fetched, displayed, filtered, searched, and managed using TanStack Query.

## Technologies Used

- React
- TypeScript
- Vite
- TanStack Query
- CSS
- ESLint

## Features Implemented

### 1. Employee List

Created employee data with multiple records containing:

- Employee ID
- Name
- Email
- Department
- Designation
- Status

Employee data is displayed in the UI using TanStack Query.

### 2. useQuery

Used `useQuery` to fetch employee data.

```ts
useQuery({
  queryKey: ["employees"],
  queryFn: getEmployees,
});