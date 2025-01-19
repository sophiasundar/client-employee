import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import  employeeReducer from './employeeSlice';
import tasksReducer from './taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    employee: employeeReducer,
    tasks: tasksReducer,
  },
});
