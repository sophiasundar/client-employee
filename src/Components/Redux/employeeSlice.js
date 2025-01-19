
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../Global';
import {jwtDecode} from 'jwt-decode';

// Get token utility function
// const getToken = () => localStorage.getItem('token');

const initialState = {
  employees: [],
  employeeDetails: {},
  status: 'idle',
  error: null,
};



// Async Thunks
export const getEmployees = createAsyncThunk(
  'employee/getEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get(`${API}/api/record/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEmployeeDetails = createAsyncThunk(
  'employee/getEmployeeDetails',
  async (userId, { rejectWithValue }) => {
    try {
      
      
      const token = localStorage.getItem('token');

      const decodedToken = jwtDecode(token); // jwt-decode library decodes the JWT
      const userId = decodedToken.userId; // Extract the userId from the decoded token
      
     
      
           
            const response = await axios.get(`${API}/api/record/employees/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for Creating an Employee
export const createEmployee = createAsyncThunk(
    'employee/createEmployee',
    async (employeeData, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token'); // Replace with your token management
        const response = await axios.post(`${API}/api/record/employees`, employeeData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  // Async thunk for updating an employee
export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async ({ id, position, department }, { rejectWithValue, getState }) => {
      const token = getState().auth.token;  // Access token from the Redux state
      
      try {
        const response = await axios.put(
          `${API}/api/record/employees/${id}`,
          { position, department },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.employee;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );
  
  // Async thunk for deleting an employee
  export const deleteEmployee = createAsyncThunk(
    'employees/deleteEmployee',
    async (id, { rejectWithValue, getState }) => {
      const token = getState().auth.token;  // Access token from the Redux state
      
      try {
        await axios.delete(`${API}/api/record/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return id;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );


// Employee Slice
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getEmployeeDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEmployeeDetails.fulfilled, (state, action) => {
        console.log('Fetched Employee Details:', action.payload);
        state.status = 'succeeded';
        state.employeeDetails = action.payload;
      })
      .addCase(getEmployeeDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.employee = action.payload;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the specific employee in the state
        const index = state.employees.findIndex(
          (employee) => employee._id === action.payload._id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the employee from the state
        state.employees = state.employees.filter(
          (employee) => employee._id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    
  },
});

export default employeeSlice.reducer;
