import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../Global';

// Define the createTimeLog async thunk
export const createTimeLog = createAsyncThunk(
  'timeLogs/createTimeLog',
  async ({ taskCode, startTime }, { getState, rejectWithValue }) => {
    try {
      const state = getState(); // Access the Redux state
      const token = state.auth.token; // Extract the token from the state

      const response = await axios.post(
        `${API}/api/timelog/create`,
        { taskCode, startTime },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
        }
      );

      return response.data.timeLog; //the response includes the new time log with `id`, Return the entire timelog object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create time log');
    }
  }
);




// Define the updateTimeLog async thunk
export const updateTimeLog = createAsyncThunk(
    'timeLogs/updateTimeLog',
    async ({ id, endTime }, { getState, rejectWithValue }) => {
      console.log('updateTimeLog called with:', { id, endTime });
   
      try {
        
        const state = getState();
        const token = state.auth.token;
  
        
        const response = await axios.put(
          `${API}/api/timelog/update/${id}`,
          { endTime },
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
  
        // Return the updated time log data
        return response.data.timeLog;
      } catch (error) {
        // Handle errors and return a rejected value with the error message
        const errorMsg = error.response?.data?.message || 'Failed to update time log';
        return rejectWithValue(errorMsg);
      }
    }
  );

  // Async thunk to fetch all time logs 
export const getAllTimeLogs = createAsyncThunk(
  'timeLogs/getAllTimeLogs',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/api/timelog/all`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data.timeLogs; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch time logs'
      );
    }
  }
);

// Async thunk to fetch time logs
export const getTimeLogs = createAsyncThunk(
  'timelogs/getTimeLogs',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('User is not authenticated');
      }

      // Make an API call to fetch time logs
      const response = await axios.get(`${API}/api/timelog/user`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      return response.data.timeLogs; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch time logs'
      );
    }
  }
);

const timeLogSlice = createSlice({
    name: 'timeLogs',
    initialState: {
      timeLogs: [], // for storing all timelogs
      currentTimeLog: null, //for for current active logs
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createTimeLog.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createTimeLog.fulfilled, (state, action) => {
           state.status = 'succeeded';
        state.timeLogs.push(action.payload); // Add the new time log to the array
        state.currentTimeLog = action.payload; // Set the current log for immediate use
        })
        .addCase(createTimeLog.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(updateTimeLog.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateTimeLog.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const updatedTimeLog = action.payload;
            const index = state.timeLogs.findIndex(log => log._id === updatedTimeLog._id);
            if (index !== -1) {
              state.timeLogs[index] = updatedTimeLog; // Update the specific time log in the state
        }
        })
        .addCase(updateTimeLog.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(getAllTimeLogs.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllTimeLogs.fulfilled, (state, action) => {
          state.loading = false;
          state.timeLogs = action.payload; 
        })
        .addCase(getAllTimeLogs.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload; 
        })
        .addCase(getTimeLogs.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getTimeLogs.fulfilled, (state, action) => {
          console.log('Fulfilled payload:', action.payload);
          state.loading = false;
          state.timeLogs = action.payload; 
        })
        .addCase(getTimeLogs.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default timeLogSlice.reducer;