import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../Redux/taskSlice';

const CreateTask = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tasks);
  
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'To-Do',
    employeeEmail: '', 
    assignedTo: '', // This will store the name
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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-lg"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-lg"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={taskData.deadline}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Project</label>
          <input
            type="text"
            name="project"
            value={taskData.project}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="employeeEmail" // Matches with the state key
            value={taskData.employeeEmail}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-lg"
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
  );
};

export default CreateTask;
