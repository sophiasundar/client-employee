import { FaHome, FaUsers, FaTasks, FaCog, FaUserCircle } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="h-full w-64 bg-gradient-to-b from-pink-500 to-teal-600 text-white p-6 shadow-lg rounded-lg">
      <div className="flex items-center mb-6">
        <FaUserCircle className="text-4xl mr-3" />
        <div>
          <h2 className="text-2xl font-semibold">Employee Dashboard</h2>
          <p className="text-sm">Welcome, Employee</p>
        </div>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <a
              href="/dashboard"
              className="flex items-center py-2 px-4 rounded-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              <FaHome className="mr-3" /> Admin Dashboard
            </a>
          </li>
          <li>
            <a
              href="/employee-dashboard"
              className="flex items-center py-2 px-4 rounded-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              <FaUsers className="mr-3" /> Employee Dashboard
            </a>
          </li>
          <li>
            <a
              href="/employees/:id"
              className="flex items-center py-2 px-4 rounded-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              <FaUsers className="mr-3" /> Employee Record
            </a>
          </li>
          <li>
            <a
              href="/tasks"
              className="flex items-center py-2 px-4 rounded-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              <FaTasks className="mr-3" /> Tasks(All Employees)
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="flex items-center py-2 px-4 rounded-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              <FaCog className="mr-3" /> Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
