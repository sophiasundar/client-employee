import { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTasks, updateTask, deleteTask } from '../../Redux/taskSlice';
import Sidebar from '../Admin dashboard/Sidebar';

const AllTasks = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.tasks);
    const [editingTask, setEditingTask] = useState(null); // State for tracking the task being edited

    useEffect(() => {
        dispatch(fetchAllTasks());
    }, [dispatch]);

    const handleEditClick = (task) => {
        setEditingTask(task); // Set the task to be edited
    };

    const handleUpdateTask = (e) => {
      e.preventDefault();
      const updatedData = {
          title: e.target.title.value,
          description: e.target.description.value,
          deadline: e.target.deadline.value,
          project: e.target.project.value,
      };
  
      // Dispatch update task action
      dispatch(updateTask({ taskId: editingTask._id, updatedData }));
  
      // Update the task locally without waiting for fetchAllTasks
      const updatedTask = { ...editingTask, ...updatedData };  // Merge updated data
      const updatedTasks = tasks.map((task) =>
          task._id === editingTask._id ? updatedTask : task
      );
      // Directly update the tasks state
      dispatch({ type: 'tasks/setTasks', payload: updatedTasks });
  
      // Reset editing state
      setEditingTask(null); // Close the edit form
  };
  
  

  const handleDeleteTask = (taskId) => {
    // Optimistically update the state: remove the task immediately from the tasks list
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    dispatch({ type: 'tasks/setTasks', payload: updatedTasks });

    // Dispatch the deleteTask action
    dispatch(deleteTask(taskId));
};

    if (loading) return <div className="text-center mt-20 text-lg">Loading tasks...</div>;
    if (error) return <div className="text-center mt-20 text-red-500 text-lg">Error: {error}</div>;

    return (
        <div className="p-6 flex h-screen">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Task List</h1>

                {/* Edit Task Form */}
                {editingTask && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold text-center">Edit Task</h2>
                        <form onSubmit={handleUpdateTask} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={editingTask.title}
                                    className="w-full mt-2 p-2 border rounded-lg"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    defaultValue={editingTask.description}
                                    className="w-full mt-2 p-2 border rounded-lg"
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    defaultValue={new Date(editingTask.deadline).toISOString().split('T')[0]}
                                    className="w-full mt-2 p-2 border rounded-lg"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Project</label>
                                <input
                                    type="text"
                                    name="project"
                                    defaultValue={editingTask.project}
                                    className="w-full mt-2 p-2 border rounded-lg"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Assigned Employee</label>
                                <input
                                    type="text"
                                    name="employee"
                                    defaultValue={editingTask.assignedTo ? editingTask.assignedTo.user.name : 'Unassigned'}
                                    className="w-full mt-2 p-2 border rounded-lg"
                                    disabled
                                />
                            </div>

                            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                                Save Changes
                            </button>
                        </form>
                    </div>
                )}

                {/* Task List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <div key={task._id} className="bg-white rounded-lg shadow-md p-6">
                            <p className="text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg px-4 py-2 mb-4 inline-block text-l font-semibold shadow-md">
                                TaskCode : {task.taskCode}
</p>

                            <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
                            <p className="text-gray-600 mb-4">{task.description}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusClass(task.status)}`}>Status : {task.status}</span>
                                <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">Project : {task.project}</span>
                                <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">{`Deadline: ${new Date(task.deadline).toLocaleDateString()}`}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
                                    {`Assigned To: ${task.assignedTo && task.assignedTo.user ? task.assignedTo.user.name : 'Unassigned'}`}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm ${getApprovalClass(task.approvalStatus)}`}>
                                   Approval Status : {task.approvalStatus}
                                </span>
                                
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleEditClick(task)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                >
                                    Edit Task
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Delete Task
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

const getStatusClass = (status) => {
    switch (status) {
        case 'To-Do':
            return 'bg-yellow-100 text-yellow-600';
        case 'In Progress':
            return 'bg-blue-100 text-blue-600';
        case 'Done':
            return 'bg-green-100 text-green-600';
        default:
            return 'bg-gray-100 text-gray-600';
    }
};

const getApprovalClass = (status) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-100 text-yellow-600';
        case 'Approved':
            return 'bg-green-100 text-green-600';
        default:
            return 'bg-gray-100 text-gray-600';
    }
};

export default AllTasks;
