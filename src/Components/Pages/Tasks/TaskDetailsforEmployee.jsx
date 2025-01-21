import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskById, updateTaskStatus } from '../../Redux/taskSlice';
import Sidebar from '../Admin dashboard/Sidebar';

const TaskDetails = () => {
  const [taskId, setTaskId] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();

  // Get task data and status from Redux store
  const { task, status: taskStatus, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskById(taskId)); // Fetch task by ID when taskId changes
    }
  }, [taskId, dispatch]);

  const handleUpdateStatus = () => {
    if (taskId && status) {
      dispatch(updateTaskStatus({ taskId, status }));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <main className="flex-1 p-8">
    <div className="p-4 max-w-xl mx-auto bg-white rounded shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Task Details</h1>

      {/* Task ID Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Enter Task ID:</label>
        <input
          type="text"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Display task details if fetched */}
      {taskStatus === 'loading' ? (
        <div>Loading task...</div>
      ) : task ? (
        <div>
          <h2 className="text-xl font-semibold">Task: {task.title}</h2>
          <p className="text-sm mt-2">Description: {task.description}</p>
          <p className="text-sm mt-2">Status: {task.status}</p>
          <p className="text-sm mt-2">Assigned Employee: {task.employee?.name}</p>
        </div>
      ) : error ? (
        <div className="text-red-500">{error.message || 'Error fetching task'}</div>
      ) : null}

      {/* Task Status Update */}
      {task && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Update Task Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Pending">Pending</option>
          </select>

          <button
            onClick={handleUpdateStatus}
            className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
          >
            Update Status
          </button>
        </div>
      )}

      {/* Display any errors during the update */}
      {taskStatus === 'failed' && (
        <div className="text-red-500 mt-4">{error?.message || 'Failed to update task'}</div>
      )}
    </div>
    </main>
    </div>
  );
};

export default TaskDetails;
