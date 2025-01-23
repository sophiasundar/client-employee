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
import AssignTask from './Components/Pages/Tasks/AssignTask';
import ProtectedRoute from './Components/ProtectedRoute';
import StartTimeLog from './Components/Pages/Timelog/StartTimeLog';
import EndTimeLog from './Components/Pages/Timelog/EndTimeLog';
import AdminTimeLogs from './Components/Pages/Timelog/AdminTimeLogs';
import EmployeeTimeLogs from './Components/Pages/Timelog/EmployeeTimelogs';


function App() {
 
  return (
    <div className="App">
      <Routes>
        
      

         <Route path='/register' element={<Register/>}></Route>
         <Route path='/' element={<Login/>}></Route>
         <Route path='/dashboard' element={<Dashboard/>} /> 

         <Route element={<ProtectedRoute roles={['admin']} />}>

           
         <Route path='/employees' element={<CreateEmployee/>}/>
         <Route path='/employees-record' element={<EmployeesRecord/>} />
         <Route path='/tasks' element={<AllTasks/>} />
         <Route path='/create-task' element={<CreateTask/>}/>
         <Route path='/task-assign' element={<AssignTask />}/>
         <Route path='/timelogs' element={<AdminTimeLogs/>} />

         </Route>

         <Route element={<ProtectedRoute roles={['employee']} />}>

         
        <Route path='/employees/:id' element={<EmployeesPage />} /> 
        <Route path="/timelog/create" element={<StartTimeLog />} />
        <Route path="/timelog/edit/:id" element={<EndTimeLog />} />
        <Route path="/timelog" element={<EmployeeTimeLogs/>} />

        </Route>

        

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
