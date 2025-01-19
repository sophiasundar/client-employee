import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeDetails } from '../../Redux/employeeSlice';
import Sidebar from './Sidebar';



const EmployeesPage = () => {
  const dispatch = useDispatch();
  const { employeeDetails, status, error } = useSelector(state => state.employee);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    dispatch(getEmployeeDetails(userId));
  }, [dispatch]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-5">Employee Details</h2>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {employeeDetails && employeeDetails.user ? (
          <div className="overflow-x-auto ">
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
                  <td className="px-4 py-2 border" colSpan="2"><strong>Task Assigned</strong></td>
                </tr>
                {employeeDetails.tasksAssigned.map(task => (
                  <React.Fragment key={task._id}>
                    <tr>
                      <td className="px-4 py-2 border">Status</td>
                      <td className="px-4 py-2 border">{task.status}</td>
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
                ))}
                <tr className="bg-gray-100">
                  <td className="px-4 py-2 border" colSpan="2"><strong>Time Logs</strong></td>
                </tr>
                {employeeDetails.timeLogs.map(timeLog => (
                  <React.Fragment key={timeLog._id}>
                    <tr>
                      <td className="px-4 py-2 border">Start Time</td>
                      <td className="px-4 py-2 border">{new Date(timeLog.startTime).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">End Time</td>
                      <td className="px-4 py-2 border">{new Date(timeLog.endTime).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">Duration</td>
                      <td className="px-4 py-2 border">{timeLog.duration} hours</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No employee details found.</p>
        )}
      </main>
    </div>
  );
};




export default EmployeesPage;
