import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  userData:{name:'', balance: 0, deposit: 0}
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => {state.userData = action.payload;
      state.history.push({
        balance: action.payload.balance,
      });},
    updateBalance: (state, action) => {state.userData.balance = action.payload;
      state.history.push({
        balance: action.payload,
      });},
      
    clearUser: (state) => {state = initialState},
    addHistory: (state, action) => {
      state.history.push(action.payload);
    },
}});

export const { createUser, clearUser, updateBalance, addHistory } = userSlice.actions;

export const selectUserName = (state) => state.user.userData.name;

export const selectBalance = (state) => state.user.userData.balance;

export const selectDeposit = (state) => state.user.userData.deposit;

export const selectHistory = (state) => state.user.history;

export default userSlice.reducer;