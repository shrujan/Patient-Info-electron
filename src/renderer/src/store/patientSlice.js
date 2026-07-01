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
      state.patientList = state.patientList.filter(patient => patient.id !== action.payload.id)
    }
  }
})

export const { addPatient, removePatient } = patientSlice.actions;
export default patientSlice.reducer
