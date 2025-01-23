import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/authSlice'; 
import { FaHome, FaClock, FaUser, FaTasks, FaCog, FaUserCircle, FaSignOutAlt, FaHourglassStart, FaHourglassEnd} from 'react-icons/fa';
import { Link } from 'react-router-dom';  
import { toast } from 'react-toastify';  

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");  
    navigate('/'); 
  };

  return (
    <div className="h-full w-80 bg-gradient-to-b from-pink-500 to-teal-600 text-white p-6 shadow-lg rounded-lg"> 
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
            <Link
              to="/dashboard"  
              className="flex items-center py-2 px-4 rounded-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              <FaHome className="mr-3" /> Admin Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"  
              className="flex items-center py-2 px-4 rounded-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              <FaTasks className="mr-3" /> Tasks (All Employees)
            </Link>
          </li>
          <li>
            <Link
              to="/employees/:id"  
              className="flex items-center py-2 px-4 rounded-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              <FaUser className="mr-3" />  Employee Record
            </Link>
          </li>
          <li>
            <Link
              to="/timelog"  
              className="flex items-center py-2 px-4 rounded-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              <FaClock className="mr-3" /> Employee Timelog
            </Link>
          </li>
          
          
          {/* Create Time Log Button */}
          <li>
            <Link
              to="/timelog/create"  
              className="flex items-center py-2 px-4 rounded-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              <FaHourglassStart className="text-green-500 " /> Start Time Log
            </Link>
          </li>
          
          {/* Edit Time Log Button */}
          <li>
            <Link
              to="/timelog/edit/:id"  
              className="flex items-center py-2 px-4 rounded-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              <FaHourglassEnd className="text-red-500 " /> End Time Log
            </Link>
          </li>

          <li>
            <Link
              to="/settings"  
              className="flex items-center py-2 px-4 rounded-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              <FaCog className="mr-3" /> Settings
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full py-2 px-4 rounded-lg transition-all hover:bg-blue-700 hover:scale-105 text-left"
            >
              <FaSignOutAlt className="mr-3" /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
