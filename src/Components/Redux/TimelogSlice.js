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
  
        // Make the API request to update the time log entry with the end time
        const response = await axios.put(
          `${API}/api/timelog/update/${id}`,
          { endTime },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the request header
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
        });
    },
  });
  
  export default timeLogSlice.reducer;