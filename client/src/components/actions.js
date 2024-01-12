
export const loginSuccess = (patientData) => ({
    type: 'LOGIN_SUCCESS',
    payload: patientData,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  export const updatePatientData = (patientData) => ({
    type: 'UPDATE_PATIENT_DATA',
    payload: patientData,
  });
  