import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTimeLogs } from '../../Redux/TimelogSlice'; 
import { toast } from 'react-toastify';
import moment from 'moment';
import Sidebar from '../Admin dashboard/Sidebar';

const AdminTimeLogs = () => {
  const dispatch = useDispatch();
  const { timeLogs, loading, error } = useSelector((state) => state.timeLogs);

  useEffect(() => {
    dispatch(getAllTimeLogs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex h-screen">
    <Sidebar />
    <main className="flex-1 p-8">
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Time Logs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : timeLogs.length === 0 ? (
        <p>No time logs found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {timeLogs.map((log) => {
            const isDeadlineClose = moment(log.task.deadline).isBefore(moment().add(3, 'days')); // Deadline within 3 days
            const isDeadlinePast = moment(log.task.deadline).isBefore(moment()); // Deadline has passed

            return (
              <div
                key={log._id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Task: {log.task.title}
                </h3>
                <p className="text-gray-600 mb-1">
                  <strong>Project:</strong> {log.task.project}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Description:</strong> {log.task.description}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Status:</strong> {log.task.status}
                </p>
                <p
                  className={`mb-1 font-bold ${
                    isDeadlinePast
                      ? 'text-red-600' // Deadline has passed
                      : isDeadlineClose
                      ? 'text-orange-600' // Deadline is close
                      : 'text-green-600' // Deadline is far away
                  }`}
                >
                  <strong>Deadline:</strong> {moment(log.task.deadline).format('YYYY-MM-DD')}
                </p>
                <hr className="my-4" />
                <p className="text-gray-600 mb-1">
                  <strong>Employee:</strong> {log.user.name} ({log.user.email})
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Role:</strong> {log.user.role}
                </p>
                <hr className="my-4" />
                <p className="text-gray-600 mb-1">
                  <strong>Start Time:</strong>{' '}
                  {moment(log.startTime).format('YYYY-MM-DD HH:mm:ss')}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>End Time:</strong>{' '}
                  {log.endTime
                    ? moment(log.endTime).format('YYYY-MM-DD HH:mm:ss')
                    : 'In Progress'}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Duration:</strong>{' '}
                  {log.duration
                    ? `${Math.floor(log.duration)} hours ${
                        Math.round((log.duration % 1) * 60)
                      } minutes`
                    : 'N/A'}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </main>
    </div>
  );
};

export default AdminTimeLogs;
