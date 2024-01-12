// store/index.js

import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authReducer = (state = { isAuthenticated: false, patientData: null }, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { isAuthenticated: true, patientData: action.payload };
    case 'LOGOUT':
      return { isAuthenticated: false, patientData: null };
    case 'UPDATE_PATIENT_DATA':
      return { ...state, patientData: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // List of reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

export { store, persistor };
