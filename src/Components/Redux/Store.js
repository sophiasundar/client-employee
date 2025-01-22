import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import  employeeReducer from './employeeSlice';
import tasksReducer from './taskSlice';
import timeLogsReducer from './TimelogSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    employee: employeeReducer,
    tasks: tasksReducer,
    timeLogs: timeLogsReducer,
  },
});
