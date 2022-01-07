import { AlertColor } from "@mui/material"

export type Icon = "X" | "O" | null
export interface Player {
  nickname: string
  icon: Icon
}
export interface Game {
  room: string
  turn: string
  players: {
    nickname: string
    icon: Icon
  }[]
  winner: Player | null
  draw: boolean
  history: Icon[]
  status: string
  board: (null | string)[]
}

export type ServerStatus = {
  type: AlertColor
  message: string
}
