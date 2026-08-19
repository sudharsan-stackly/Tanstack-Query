import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";

function App() {
  return (
    <div className="container">
      <h1>OneCloud Employee Management</h1>

      <AddEmployee />

      <EmployeeList />
    </div>
  );
}

export default App;