import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, Doughnut } from 'react-chartjs-2';
import { getEmployeeDetails } from '../../Redux/employeeSlice';
import { updateTaskStatus } from '../../Redux/taskSlice';
import Sidebar from './Sidebar';
import 'chart.js/auto';

const EmployeesPage = () => {
  const dispatch = useDispatch();
  const { employeeDetails, status, error } = useSelector((state) => state.employee);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    dispatch(getEmployeeDetails(userId));
  }, [dispatch]);

  const handleStatusChange = (taskId) => {
    setSelectedTaskId(taskId);
    const task = employeeDetails.tasksAssigned.find((task) => task._id === taskId);
    setNewStatus(task.status);
  };

  const handleSubmitStatusUpdate = (taskId) => {
    if (newStatus !== '') {
      dispatch(updateTaskStatus({ taskId, status: newStatus }))
        .then(() => {
          setSelectedTaskId(null);
          setNewStatus('');
        })
        .catch(() => {
          alert('Error updating task status');
        });
    } else {
      alert('Please select a status');
    }
  };

  const renderCharts = () => {
    if (!employeeDetails.performanceMetrics) return null;

    const hoursWorkedData = {
      labels: ['Total Hours Worked'],
      datasets: [
        {
          label: 'Hours Worked',
          data: [employeeDetails.performanceMetrics.totalHoursWorked],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    const tasksCompletedData = {
      labels: ['Tasks Completed', 'Tasks Remaining'],
      datasets: [
        {
          label: 'Tasks',
          data: [
            employeeDetails.performanceMetrics.tasksCompleted,
            employeeDetails.tasksAssigned.length - employeeDetails.performanceMetrics.tasksCompleted,
          ],
          backgroundColor: ['#4CAF50', '#FF7043'],
          hoverOffset: 4,
        },
      ],
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-center">Total Hours Worked</h3>
          <Bar data={hoursWorkedData} />
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-center">Tasks Completed</h3>
          <Doughnut data={tasksCompletedData} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 mb-10 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-5 text-teal-600">Employee Details</h2>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {employeeDetails && employeeDetails.user ? (
          <>
            {renderCharts()}
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Field</th>
                    <th className="px-4 py-2 border">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">Name</td>
                    <td className="px-4 py-2 border">{employeeDetails.user?.name}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Email</td>
                    <td className="px-4 py-2 border">{employeeDetails.user?.email}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Position</td>
                    <td className="px-4 py-2 border">{employeeDetails.position}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Department</td>
                    <td className="px-4 py-2 border">{employeeDetails.department}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Tasks Completed</td>
                    <td className="px-4 py-2 border">{employeeDetails.performanceMetrics?.tasksCompleted}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Total Hours Worked</td>
                    <td className="px-4 py-2 border">{employeeDetails.performanceMetrics?.totalHoursWorked}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 border" colSpan="2">
                      <strong>Task Assigned</strong>
                    </td>
                  </tr>
                  {employeeDetails.tasksAssigned.map((task) => {
                    const isDeadlineClose = new Date(task.deadline) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
                    const isDeadlinePast = new Date(task.deadline) < new Date();

                    return (
                      <React.Fragment key={task._id}>
                        <tr className="relative">
                          <td className="px-4 py-2 border">Status</td>
                          <td className="px-4 py-2 border">{task.status}</td>
                          <td className="px-4 py-2 border">
                            <button
                              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                              onClick={() => handleStatusChange(task._id)}
                            >
                              Edit Status
                            </button>
                          </td>
                          <span
                            className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-bold ${
                              isDeadlinePast
                                ? 'bg-red-100 text-red-600'
                                : isDeadlineClose
                                ? 'bg-orange-100 text-orange-600'
                                : 'bg-green-100 text-green-600'
                            }`}
                          >
                            {isDeadlinePast
                              ? 'Deadline Passed'
                              : isDeadlineClose
                              ? 'Deadline Approaching'
                              : 'Deadline Far Away'}
                          </span>
                        </tr>
                        {selectedTaskId === task._id && (
                          <tr>
                            <td colSpan="3" className="px-4 py-2 border">
                              <div className="flex items-center space-x-4">
                                <select
                                  className="px-4 py-2 border rounded-md"
                                  value={newStatus}
                                  onChange={(e) => setNewStatus(e.target.value)}
                                >
                                  <option value="">Select Status</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Done">Completed</option>
                                </select>
                                <button
                                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                  onClick={() => handleSubmitStatusUpdate(task._id)}
                                >
                                  Update Status
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td className="px-4 py-2 border">Task Code</td>
                          <td className="px-4 py-2 border">{task.taskCode}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Description</td>
                          <td className="px-4 py-2 border">{task.description}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Deadline</td>
                          <td className="px-4 py-2 border">{new Date(task.deadline).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Project</td>
                          <td className="px-4 py-2 border">{task.project}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>No employee details found.</p>
        )}
      </main>
    </div>
  );
};

export default EmployeesPage;




