export type Icon = "X" | "O" | null
export interface Game {
  room: string
  turn: string
  players: {
    nickname: string
    icon: Icon
  }[]
  winner: string | null
  draw: boolean
  history: number[]
  status: string
  board: (null | string)[]
}
