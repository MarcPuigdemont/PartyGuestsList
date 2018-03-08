import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux-loop';
import { firebaseReducer } from 'react-redux-firebase';
import partyListsReducer from './reducer-party-list';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
  routing: routerReducer,
  firebase: firebaseReducer,
  partyLists: partyListsReducer
});

export default allReducers;
