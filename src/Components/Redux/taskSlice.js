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
      const response = await axios.get(`${API}/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.task;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);





export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, updatedData }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token; // Assuming you store the token in auth slice

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
      const token = state.auth.token; // Assuming you store the token in auth slice

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
      const token = state.auth.token; // Ensure the token is stored in auth slice

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
  async ({ taskCode, employeeEmail }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/tasks/assign', { taskCode, employeeEmail });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);


// Thunk to get a task by ID
export const getTaskById = createAsyncThunk(
  'tasks/getTaskById',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/api/tasks/${taskId}`);
      return response.data.task;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Thunk to update task status
export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ taskId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API}/api/tasks/status/${taskId}`, { status });
      return response.data.task;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      });

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
      .addCase(getTaskById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.task = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
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
      });
  },
});

export default tasksSlice.reducer;
