import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Game } from "../types"

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    game: {
      board: Array(9).fill(null),
      history: [],
      players: [],
      room: "",
      status: "",
      turn: "X",
      winner: {
        nickname: "",
        icon: null,
      },
      draw: false,
    } as Game,
  },
  reducers: {
    setGame: (state, action: PayloadAction<Game>) => {
      state.game = action.payload
    },
  },
})

export const { setGame } = counterSlice.actions

export default counterSlice.reducer
