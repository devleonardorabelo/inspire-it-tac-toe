import React from "react"
import * as M from "@mui/material"
import { GameModal, PlayerCard, SquareButton } from "./components"
import io, { Socket } from "socket.io-client"
import { Game } from "./types"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { currentGame } from "./redux/store"
import { setGame } from "./redux/save"
import "./styles.css"

function App() {
  const [room, setRoom] = React.useState("")
  const [nickname, setNickname] = React.useState("")
  const [connected, setConnected] = React.useState(false)
  const [socket, setSocket] = React.useState<Socket | null>(null)
  const { game } = useAppSelector(currentGame)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const socketClient = io("http://192.168.1.5:3001/", {
      transports: ["websocket"],
    })
    socketClient.on("board", (e: Game) => dispatch(setGame(e)))
    socketClient.on("connection", () => {
      setConnected(true)
    })
    setSocket(socketClient)
  }, [dispatch])

  const selectSquare = React.useCallback(
    (pos: number) => {
      socket?.emit("move", { pos, room, nickname })
    },
    [nickname, room, socket]
  )

  const restart = React.useCallback(
    () => socket?.emit("restart", room),
    [socket, room]
  )
  const createRoom = React.useCallback(() => {
    socket?.emit("enterTheRoom", { room, nickname })
  }, [socket, room, nickname])

  // ? RENDER ? //
  const renderSquare = React.useCallback(
    (pos: number) => {
      return (
        <SquareButton
          key={pos}
          value={game.board[pos]}
          onClick={() => selectSquare(pos)}
        />
      )
    },
    [game.board, selectSquare]
  )

  const renderBoardRow = React.useCallback(
    (startPos: number) => (
      <M.Stack direction="row">
        {[...Array(3)].map((_, index) => renderSquare(startPos + index))}
      </M.Stack>
    ),
    [renderSquare]
  )

  return (
    <>
      <GameModal
        open={game.draw || !!game.winner?.nickname}
        onSubmit={restart}
      />

      <M.Container sx={{ height: "100vh" }}>
        {connected ? (
          <>
            <M.Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ height: "100%" }}
            >
              <PlayerCard player="X" />

              <M.Box
                sx={{
                  background: "rgba(28, 28, 28, 0.5)",
                  backdropFilter: "blur(43px)",
                  borderRadius: 4,
                }}
                p={4}
              >
                <M.Stack
                  sx={{
                    background: "url(/assets/svg/board.svg) no-repeat center",
                    backgroundSize: "cover",
                  }}
                >
                  {renderBoardRow(0)}
                  {renderBoardRow(3)}
                  {renderBoardRow(6)}
                </M.Stack>
              </M.Box>
              <PlayerCard player="O" />
            </M.Stack>
          </>
        ) : (
          <M.Stack spacing={2}>
            <M.TextField
              onChange={(e) => setNickname(e.target.value)}
              label="Nome de Jogador"
            />
            <M.TextField
              onChange={(e) => setRoom(e.target.value)}
              label="ID da sala"
            />
            <M.Button variant="contained" onClick={createRoom}>
              Entrar
            </M.Button>
          </M.Stack>
        )}
      </M.Container>
    </>
  )
}

export default App
