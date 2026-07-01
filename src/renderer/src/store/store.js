import { configureStore } from '@reduxjs/toolkit'
import patientReducer from './patientSlice'

const store = configureStore({
  reducer: patientReducer
});

export default store;
