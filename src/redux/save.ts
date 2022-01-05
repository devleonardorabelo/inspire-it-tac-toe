import { createSlice } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    squares: Array(9).fill(null),
    players: [
      { name: "Player 1", history: [""], icon: "X" },
      { name: "Player 2", history: [""], icon: "O" },
    ],
  },
  reducers: {
    setGame: (state, action) => {
      state.squares = action.payload
    },
    resetGame: (state) => {
      state.squares = counterSlice.getInitialState().squares
    },
  },
})

export const { setGame, resetGame } = counterSlice.actions

export default counterSlice.reducer
