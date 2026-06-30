import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: patientReducer
});

export default store;
