import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Game } from "../types"

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    nickname: "",
    room: null as string | null,
    connected: false,
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
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload
    },
    setRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload
    },
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload
    },
  },
})

export const { setGame, setNickname, setRoom, setIsConnected } =
  counterSlice.actions

export default counterSlice.reducer
