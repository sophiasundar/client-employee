import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { updateTimeLog } from '../../Redux/TimelogSlice';
import { toast } from 'react-toastify';
import Sidebar from '../Admin dashboard/Sidebar';

const EndTimeLog = () => {
  const dispatch = useDispatch();
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const currentTimeLog = useSelector((state) => state.timeLogs.currentTimeLog);

  useEffect(() => {
    // Get the current UTC time
    const utcDate = new Date();

    // Add 5 hours and 30 minutes to UTC time for Chennai (IST)
    utcDate.setHours(utcDate.getHours() + 5);
    utcDate.setMinutes(utcDate.getMinutes() + 30);

    // Convert the updated time to ISO string and format it as 'yyyy-MM-ddThh:mm' for datetime-local input
    const formattedTime = utcDate.toISOString().slice(0, 16);

    // Set the formatted IST time in the state
    setEndTime(formattedTime);
  }, []); // This will run once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!endTime) {
      setError('Please enter the End Time.');
      return;
    }
    setError('');

    if (!currentTimeLog || !currentTimeLog._id) {
      toast.error('No active time log found!');
      return;
    }

    try {
      await dispatch(
        updateTimeLog({ id: currentTimeLog._id, endTime })
      ).unwrap(); // Unwrap to handle success/errors
      toast.success('Time log updated successfully!');
      setEndTime(''); // Clear endTime after successful submission
    } catch (err) {
      toast.error(err || 'Failed to update time log.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <main className="flex-1 p-8">
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
            readOnly 
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Submit End Time
        </button>
      </form>
    </div>
    </main>
    </div>
  );
};

export default EndTimeLog;


