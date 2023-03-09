import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
  balanceHistory: {}
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateResultGame: (state, action) => {
      const { gameName, balanceChange } = action.payload;
      state.games = state.games.includes(gameName)
        ? state.games
        : [...state.games, gameName];
      state.balanceHistory[gameName] = [
        ...(state.balanceHistory[gameName] || []),
        balanceChange
      ];
    },
    deleteResultGame: (state) => (state = initialState),
    addBalanceHistory: (state, action) => {
      state.balanceHistory["total"] = [
        ...(state.balanceHistory["total"] || []),
        action.payload
      ];
    },
  },
});

export const {
  updateResultGame,
  deleteResultGame,
  addBalanceHistory
} = gameSlice.actions;

export const getResultGame = (state) => state.game;

export const selectBalanceHistory = (state) => state.game.balanceHistory;

export default gameSlice.reducer;
