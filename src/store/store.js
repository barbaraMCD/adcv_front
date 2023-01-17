import UsersReducer from './reducers/users';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  users: UsersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export {store};
