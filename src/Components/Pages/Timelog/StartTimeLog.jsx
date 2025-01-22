import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTimeLog } from '../../Redux/TimelogSlice'; 
import { toast } from 'react-toastify';

const StartTimeLog = () => {
  const [taskCode, setTaskCode] = useState('');
  const [startTime, setStartTime] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskCode || !startTime) {
      setError('Please enter both Task Code and Start Time.');
      return;
    }

    dispatch(createTimeLog({ taskCode, startTime }));
    toast.success('Time log started successfully!');
    setTaskCode('');
    setStartTime('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Start Time Log</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Code Field */}
        <div className="flex flex-col">
          <label htmlFor="taskCode" className="text-lg font-medium text-gray-700">
            Task Code
          </label>
          <input
            type="text"
            id="taskCode"
            value={taskCode}
            onChange={(e) => setTaskCode(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-md"
            placeholder="Enter Task Code"
            required
          />
        </div>

        {/* Start Time Field */}
        <div className="flex flex-col">
          <label htmlFor="startTime" className="text-lg font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Start Time Log
        </button>
      </form>
    </div>
  );
};

export default StartTimeLog;
