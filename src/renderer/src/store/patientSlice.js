import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientList: []
}

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient(state, action) {
      state.patientList.push(action.payload)
    },
    removePatient(state, action) {
      state.patientList = state.patientList.filter(patient => patient.id !== action.payload)
    },
    editPatient(state, action) {
      const patientIndex = state.patientList.findIndex( patient => patient.id === action.payload.id);
      if (patientIndex !== -1) {
        state.patientList[patientIndex] = action.payload;
      }
    },
    addBulkPatients(state, action)  {
      state.patientList = action.payload
    }
  }
})

export const { addPatient, removePatient, editPatient, addBulkPatients } = patientSlice.actions;
export default patientSlice.reducer
