import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, updateEmployee, deleteEmployee } from '../../Redux/employeeSlice';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';

const EmployeesRecord = () => {
  const dispatch = useDispatch();
  const { employees, status, error } = useSelector((state) => state.employee);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newPosition, setNewPosition] = useState('');
  const [newDepartment, setNewDepartment] = useState('');

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setNewPosition(employee.position);
    setNewDepartment(employee.department);
  };

  const handleUpdate = () => {
    if (newPosition && newDepartment) {
      dispatch(updateEmployee({ id: editingEmployee._id, position: newPosition, department: newDepartment }))
        .then(() => {
          toast.success('Employee updated successfully');
          setEditingEmployee(null); 
        })
        .catch(() => toast.error('Failed to update employee'));
    } else {
      toast.error('All fields are required');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id))
        .then(() => toast.success('Employee deleted successfully'))
        .catch(() => toast.error('Failed to delete employee'));
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-5">Employee Records</h2>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p className="text-red-500">{error.message}</p>}

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Position</th>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border">Tasks Completed</th>
                <th className="px-4 py-2 border">Total Hours Worked</th>
                <th className="px-4 py-2 border">Task Title</th>
                <th className="px-4 py-2 border">Task Deadline</th>
                <th className="px-4 py-2 border">Task Status</th>
                <th className="px-4 py-2 border">Task Duration</th>
                <th className="px-4 py-2 border">Employee Created At</th>
                <th className="px-4 py-2 border">Task Created At</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees && employees.map((employee) => (
                <tr key={employee._id}>
                  <td className="px-4 py-2 border">{employee.user?.name || 'N/A'}</td>
                  <td className="px-4 py-2 border">{employee.user?.email || 'N/A'}</td>
                  <td className="px-4 py-2 border">{employee.position}</td>
                  <td className="px-4 py-2 border">{employee.department}</td>
                  <td className="px-4 py-2 border">{employee.performanceMetrics?.tasksCompleted || 0}</td>
                  <td className="px-4 py-2 border">{employee.performanceMetrics?.totalHoursWorked || 0}</td>
                  
                  {/* Task details */}
                  <td className="px-4 py-2 border">
                    {employee.tasksAssigned && employee.tasksAssigned.length > 0 ? (
                      employee.tasksAssigned.map(task => (
                        <div key={task._id}>
                          {task.title}
                        </div>
                      ))
                    ) : 'No tasks assigned'}
                  </td>
                  <td className="px-4 py-2 border">
                    {employee.tasksAssigned && employee.tasksAssigned.length > 0 ? (
                      employee.tasksAssigned.map(task => (
                        <div key={task._id}>
                          {new Date(task.deadline).toLocaleDateString()}
                        </div>
                      ))
                    ) : 'N/A'}
                  </td>
                  <td className="px-4 py-2 border">
                    {employee.tasksAssigned && employee.tasksAssigned.length > 0 ? (
                      employee.tasksAssigned.map(task => (
                        <div key={task._id}>
                          {task.status}
                        </div>
                      ))
                    ) : 'N/A'}
                  </td>
                  <td className="px-4 py-2 border">
                    {employee.timeLogs && employee.timeLogs.length > 0 ? (
                      employee.timeLogs.map(log => (
                        <div key={log._id}>
                          {log.duration} hours
                        </div>
                      ))
                    ) : 'No time logs'}
                  </td>

                  {/* Date fields */}
                  <td className="px-4 py-2 border">{new Date(employee.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">
                    {employee.tasksAssigned && employee.tasksAssigned.length > 0 ? (
                      new Date(employee.tasksAssigned[0].createdAt).toLocaleDateString()
                    ) : 'N/A'}
                  </td>

                  <td className="px-4 py-2 border flex space-x-3">
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Employee Modal */}
        {editingEmployee && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h3 className="text-xl font-semibold mb-4">Edit Employee</h3>
              <div className="mb-4">
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  id="position"
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  id="department"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-400 text-white py-1 px-3 rounded"
                  onClick={() => setEditingEmployee(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmployeesRecord;
