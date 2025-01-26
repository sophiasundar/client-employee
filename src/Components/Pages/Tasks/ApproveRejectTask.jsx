import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTasks, approveOrRejectTask } from '../../Redux/taskSlice';

const ApproveRejectTask = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchAllTasks()); // Fetch all tasks when the component is mounted
  }, [dispatch]);

  const handleApproval = (task, approvalStatus) => {
    // Optimistically update the approval status
    const updatedTask = { ...task, approvalStatus };
    const updatedTasks = tasks.map((t) => (t._id === task._id ? updatedTask : t));

    // Dispatch the updated tasks to the store
    dispatch({ type: 'tasks/setTasks', payload: updatedTasks });

    // Dispatch the actual approve/reject action
    dispatch(approveOrRejectTask({ id: task._id, approvalStatus }));
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error fetching tasks: {error.message || 'An unknown error occurred'}</div>;

  return (
    <div className="task-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <div key={task._id} className="task-card border p-4 rounded shadow-md mb-4">
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
          <p className="text-sm text-gray-500">Status: {task.status}</p>
          <p className="text-sm text-gray-500">Approval Status: {task.approvalStatus}</p>

          <div className="mt-2">
            <button
              className="bg-green-500 text-white p-2 rounded mr-2"
              onClick={() => handleApproval(task, 'Approved')}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => handleApproval(task, 'Rejected')}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApproveRejectTask;


