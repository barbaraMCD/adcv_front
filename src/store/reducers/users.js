import {createSlice} from '@reduxjs/toolkit';

export const Users = createSlice({
  name: 'Users',
  initialState: {
    users: [],
  },
  reducers: {
    populateUsers: (state, action) => {
      state.users = action.payload;
    },
    addUsers: (state, action) => {
      state.users = [...state.users, action.payload];
    },
  },
});

export const {populateUsers, addUsers} = Users.actions;

export default Users.reducer;
