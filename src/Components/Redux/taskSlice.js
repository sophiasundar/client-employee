import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../Global';


// Async thunk to fetch all tasks with optional status filter
export const fetchAllTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (status, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/api/task/`, {
        params: { status },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched tasks:', response.data.tasks);
      return response.data.tasks;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch a task by ID for employee
export const fetchTaskById = createAsyncThunk(
  'tasks/fetchById',
  async (taskId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching task with taskId:', taskId);
      const response = await axios.get(`${API}/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Received task data:', response.data);
      return response.data.task;
    } catch (error) {
      console.error('Error fetching task:', error);
      return rejectWithValue(error.response.data);
    }
  }
);





export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, updatedData }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.put(
        `${API}/api/task/${taskId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token; 

      const response = await axios.delete(
        `${API}/api/task/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating a task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token; 

      const response = await axios.post(
        `${API}/api/task/create`, 
        taskData,  // Body data
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        }
      );

      return response.data.task; // Return the task data
    } catch (error) {
      // Handle error and return the message
      return rejectWithValue(error.response?.data?.message || 'Server error');
    }
  }
);

// Async Thunk for assigning task to employee
export const assignTaskToEmployee = createAsyncThunk(
  'tasks/assignTaskToEmployee',
  async ({ taskCode, employeeEmail }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token; 

      if (!token) {
        return rejectWithValue("No token found. Please log in.");
      }

      const response = await axios.put(
        `${API}/api/task/assign`, 
        { taskCode, employeeEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        }
      );

      return response.data; 
    } catch (error) {
      const errorMsg = error.response?.data || 'An error occurred';
      return rejectWithValue(errorMsg);
    }
  }
);


// Thunk to update task status
export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ taskId, status }, {getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.put(`${API}/api/task/status/${taskId}`, { status },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        }

      );
      return response.data.task;
    } catch (error) {
      const errorMsg = error.response?.data || 'An error occurred';
      return rejectWithValue(errorMsg.response.data);
    }
  }
);



// Approve or Reject Task Async Thunk
export const approveOrRejectTask = createAsyncThunk(
  'task/approveOrRejectTask',
  async ({ id, approvalStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API}/api/task/approve-reject/${id}`,
        { approvalStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      return response.data; // Return updated task data
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : { message: 'Something went wrong' }
      );
    }
  }
);



const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    task: null,
    loading: false,
    error: null,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },

  },
  extraReducers: (builder) => {
    // Handle fetchAllTasks
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Handle fetchTaskById
    builder
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload); // Add the new task to the state
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      builder
      .addCase(assignTaskToEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(assignTaskToEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Optionally update tasks list after assigning the task
        state.tasks = [...state.tasks, action.payload.task];
      })
      .addCase(assignTaskToEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(updateTaskStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.task = action.payload;
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(approveOrRejectTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveOrRejectTask.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming response contains the updated task data
        const updatedTask = action.payload;
        // Update the task in the state by its ID
        const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(approveOrRejectTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default tasksSlice.reducer;
