import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Game, ServerStatus } from "../types"

export const initialState = {
  nickname: "",
  room: null as string | null,
  connected: false,
  status: {
    message: "",
    type: "error",
  } as ServerStatus,
  socketConnected: false,
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
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
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
    setStatus: (state, action: PayloadAction<ServerStatus>) => {
      state.status = action.payload
    },
    resetStatus: (state) => {
      state.status = initialState.status
    },
    resetGame: (state) => {
      state.game = initialState.game
    },
    setSocketConnection: (state, action: PayloadAction<boolean>) => {
      state.socketConnected = action.payload
    },
  },
})

export const {
  setGame,
  setNickname,
  setRoom,
  setIsConnected,
  setStatus,
  resetStatus,
  resetGame,
  setSocketConnection,
} = counterSlice.actions

export default counterSlice.reducer
