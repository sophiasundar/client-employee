import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './Components/Pages/Register';
import Login from './Components/Pages/Login.';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/Pages/Admin dashboard/Dashboard';
import EmployeesPage from './Components/Pages/Admin dashboard/EmployeePage';
import EmployeesRecord from './Components/Pages/Admin dashboard/EmployeesRecord';
import CreateEmployee from './Components/Pages/Admin dashboard/CreateEmployee';
import AllTasks from './Components/Pages/Tasks/AllTasks';
import CreateTask from './Components/Pages/Tasks/CreateTask';


function App() {
  return (
    <div className="App">
      <Routes>
       {/* protected routes need to be implemented */}

         <Route path='/register' element={<Register/>}></Route>
         <Route path='/' element={<Login/>}></Route>
         <Route path='/dashboard' element={<Dashboard/>} />
         <Route path='/employees' element={<CreateEmployee/>}/>
        <Route path='/employees/:id' element={<EmployeesPage />} />
        <Route path='/employees-record' element={<EmployeesRecord/>} />
        <Route path='/tasks' element={<AllTasks/>} />
        <Route path='/create-task' element={<CreateTask/>}/>


      </Routes>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </div>
  );
}

export default App;
