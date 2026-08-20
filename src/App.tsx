import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import GlobalLoading from "./components/GlobalLoading";

function App() {
  return (
    <div className="container">
      <GlobalLoading />

      <h1>
        OneCloud Employee Management
      </h1>

      <AddEmployee />

      <EmployeeList />
    </div>
  );
}

export default App;