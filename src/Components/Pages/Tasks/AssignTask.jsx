
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { assignTaskToEmployee } from '../../Redux/taskSlice';

const AssignTaskForm = () => {
  const dispatch = useDispatch();
  const [taskCode, setTaskCode] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleAssignTask = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(assignTaskToEmployee({ taskCode, employeeEmail }));
    if (assignTaskToEmployee.fulfilled.match(resultAction)) {
      setMessage('Task assigned successfully!');
    } else {
      setMessage('Failed to assign task. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Assign Task to Employee</h2>
      <form onSubmit={handleAssignTask}>
        <div className="mb-4">
          <label htmlFor="taskCode" className="block text-gray-700 font-medium mb-2">
            Task Code
          </label>
          <input
            type="text"
            id="taskCode"
            value={taskCode}
            onChange={(e) => setTaskCode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="employeeEmail" className="block text-gray-700 font-medium mb-2">
            Employee Email
          </label>
          <input
            type="email"
            id="employeeEmail"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Assign Task
        </button>
      </form>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default AssignTaskForm;
