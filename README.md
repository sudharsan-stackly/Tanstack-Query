# TanStack Query - Employee Management System

A React + TypeScript Employee Management System built to learn and practice TanStack Query concepts through real-world CRUD operations.

The project started with basic TanStack Query concepts and has now been upgraded with advanced features such as Optimistic Updates, Query Cancellation, Cache Updates, Mutations, Retry Handling, and Conditional Queries.

---

## 🚀 Technologies Used

- React
- TypeScript
- TanStack Query
- Vite
- CSS
- REST API / JSON Server

---

## 📚 TanStack Query Concepts Covered

### 🟢 Basic Concepts

- QueryClient
- QueryClientProvider
- useQuery
- queryKey
- queryFn
- Dynamic queryKey
- Loading State
- Error Handling

### 🔎 Query & Filtering Concepts

- Search
- Status Filter
- Department Filter
- refetch
- staleTime
- enabled
- retry
- gcTime

### ✏️ Mutation Concepts

- useMutation
- Add Employee
- Update Employee
- Delete Employee
- isPending
- onMutate
- onSuccess
- onError
- onSettled

### ⚡ Advanced Cache & Optimistic Update Concepts

- Query Invalidation
- cancelQueries
- getQueryData
- setQueryData
- Optimistic Updates
- useIsFetching

---

## 👨‍💼 Employee Management Features

### Employee List

- Display all employees
- Fetch employee data using `useQuery`
- Loading state
- Error handling
- Manual data refetching

### Search

Search employees dynamically based on employee information.

### Filters

Filter employees by:

- Department
- Status

### Add Employee

Create a new employee using `useMutation`.

After successful creation, the employee list is refreshed using Query Invalidation.

### Update Employee

Update existing employee information using TanStack Query mutations.

The update operation demonstrates:

- useMutation
- onMutate
- onSuccess
- onError
- onSettled
- setQueryData

### Delete Employee

Delete an employee using a mutation.

The application uses Optimistic Updates so the employee can be removed from the UI immediately while the API request is processed.

If the API request fails, the previous data can be restored.

---

## ⚡ Optimistic Updates

The project demonstrates TanStack Query's Optimistic Update pattern.

The basic flow is:

User Action
    ↓
onMutate
    ↓
Cancel Existing Query
    ↓
Store Previous Data
    ↓
Update UI Immediately
    ↓
API Request
    ↓
Success / Error
    ↓
Success → Keep Update
Error → Rollback Previous Data
    ↓
onSettled
    ↓
Refetch / Synchronize Data

---

## 🧠 Cache Management

The application uses TanStack Query's cache APIs to manage server state.

### getQueryData

Used to access currently cached employee data.

### setQueryData

Used to directly update cached employee data without immediately requesting the API again.

### cancelQueries

Used during optimistic updates to prevent an existing query from overwriting the optimistic state.

### Query Invalidation

Used after successful mutations to mark cached queries as stale and synchronize the employee list with the server.

---

## 🔄 Query States

The project demonstrates different TanStack Query states.

### isPending

Used to identify the initial loading state of a query or mutation.

### isFetching

Used to identify when data is being fetched, including background fetching.

### isError

Used when a request fails.

### isSuccess

Used when data is successfully loaded.

### useIsFetching

Used to detect active queries globally and display a global loading indicator.

---

## ⏳ staleTime

`staleTime` controls how long fetched data is considered fresh.

Example:

```tsx
staleTime: 5000