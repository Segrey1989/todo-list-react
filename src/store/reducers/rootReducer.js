import authReducer from './authReducer';
import projectReducer from './projectReducer';
import dataReducer from './dataReducer';
import settingsReducer from './settingsReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  dataHelper: dataReducer,
  settingsReducer: settingsReducer,
});

export default rootReducer;
