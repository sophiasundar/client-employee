import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-700">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Employee Management</h2>
            <p className="mt-2 text-gray-500">Manage employee records and create new employees.</p>
            <button
              className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={() => navigate('/employees')}
            >
              Create Employee
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Employee Records</h2>
            <p className="mt-2 text-gray-500">View and manage all employee records.</p>
            <button
              className="mt-4 w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={() => navigate('/employees-record')}
            >
              View Records
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Create Task</h2>
            <p className="mt-2 text-gray-500">Create task for employee by admin, easy to create task.</p>
            <button
              className="mt-4 w-full py-2 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              onClick={() => navigate('/create-task')}
            >
             Create Task
            </button>
            </div>


          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Task Assigning</h2>
            <p className="mt-2 text-gray-500">Assign tasks to employees and manage their progress.</p>
            <button
              className="mt-4 w-full py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              onClick={() => navigate('/task-assign')}
            >
              Assign Task
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Task Approval</h2>
            <p className="mt-2 text-gray-500">Approve or reject tasks, when the employee completed the task.</p>
            <button
              className="mt-4 w-full py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
              onClick={() => navigate('/Approval')}
            >
              Approve Tasks
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

