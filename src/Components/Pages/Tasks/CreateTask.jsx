import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../Redux/taskSlice';
import Sidebar from '../Admin dashboard/Sidebar';

const CreateTask = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tasks);
  
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'To-Do',
    employeeEmail: '', 
    assignedTo: '', //  store the name
    deadline: '',
    project: '',
   
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to create task, sending `assignedTo` as the name
    dispatch(createTask(taskData));
  };

  return (
    <div className="flex h-screen ">
    <Sidebar/>
    <main className="flex-1 p-6 mb-8">
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">Create New Task</h2>
      {error && <div className="text-red-500 mb-3">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-lg text-sm"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-lg text-sm"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-lg text-sm"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={taskData.deadline}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-lg text-sm"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Project</label>
          <input
            type="text"
            name="project"
            value={taskData.project}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-lg text-sm"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="employeeEmail" 
            value={taskData.employeeEmail}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-lg text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg"
        >
          {loading ? 'Creating Task...' : 'Create Task'}
        </button>
      </form>
    </div>
    </main>
    </div>
  );
};

export default CreateTask;
