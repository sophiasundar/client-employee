import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTimeLog } from '../../Redux/TimelogSlice'; 
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EndTimeLog = () => {
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const { id } = useParams(); 
  console.log('ID:', id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!endTime) {
      setError('Please enter the End Time.');
      return;
    }

    dispatch(updateTimeLog({ id, endTime }));
    toast.success('Time log updated successfully!');
    setEndTime('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">End Time Log</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* End Time Field */}
        <div className="flex flex-col">
          <label htmlFor="endTime" className="text-lg font-medium text-gray-700">
            End Time
          </label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          End Time Log
        </button>
      </form>
    </div>
  );
};

export default EndTimeLog;
