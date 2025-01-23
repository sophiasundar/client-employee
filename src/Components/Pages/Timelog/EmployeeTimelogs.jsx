import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeLogs } from '../../Redux/TimelogSlice';
import Sidebar from '../Admin dashboard/Sidebar';

const EmployeeTimeLogs = () => {
  const dispatch = useDispatch();
  const { timeLogs, loading, error } = useSelector((state) => state.timeLogs);


  useEffect(() => {
    dispatch(getTimeLogs())
      .unwrap()
      .catch((err) => console.error('Error fetching time logs:', err));
  }, [dispatch]);
  

  return (
    <div className="flex h-screen bg-gray-50">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <main className="flex-1 p-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-teal-700 mb-6">
          Your Time Logs
        </h1>

        {loading && (
          <p className="text-gray-500 animate-pulse">Loading time logs...</p>
        )}
        {error && <p className="text-red-500 font-semibold">{error}</p>}

        {!loading && !error && timeLogs.length === 0 && (
          <p className="text-gray-500">No time logs found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timeLogs.map((log) => (
            <div
              key={log._id}
              className="bg-white border border-gray-200 shadow-sm rounded-lg p-4"
            >
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                {log.task.title}
              </h2>
              <p className="text-gray-600 text-sm">
                <strong>Duration:</strong> {log.duration} hours
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Deadline:</strong>{' '}
                {new Date(log.task.deadline).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Project:</strong> {log.task.project}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Approval Status:</strong>{' '}
                <span
                  className={`font-semibold ${
                    log.task.approvalStatus === 'Approved'
                      ? 'text-green-600'
                      : log.task.approvalStatus === 'Pending'
                      ? 'text-orange-600'
                      : 'text-red-600'
                  }`}
                >
                  {log.task.approvalStatus}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
  );
};

export default EmployeeTimeLogs;
