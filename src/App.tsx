import React from "react"
import * as M from "@mui/material"
import { GameModal, PlayerCard, SquareButton, WaitingModal } from "./components"
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

  const renderBoard = React.useMemo(
    () => [...Array(9)].map((_, index) => renderSquare(index)),
    [renderSquare]
  )

  return (
    <>
      <GameModal
        open={game.draw || !!game.winner?.nickname}
        onSubmit={restart}
      />
      <WaitingModal open={connected && game.players.length !== 2} />
      <M.Container
        sx={{
          minHeight: "100vh",
          overflow: "y",
        }}
      >
        {connected ? (
          <>
            <M.Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              p={2}
              sx={{
                minHeight: "100vh",
                margin: "0 auto",
                alignSelf: "center",
                justifySelf: "center",
                boxSizing: "border-box",
              }}
            >
              <M.Box
                gridTemplateAreas={{
                  xs: `"board board" "playerX playerO"`,
                  md: `"playerX board playerO"`,
                }}
                gridTemplateColumns={{
                  xs: "1fr 1fr",
                  md: "200px 1fr 200px",
                }}
                gridTemplateRows={{
                  xs: "auto auto",
                  md: "1fr",
                }}
                rowGap={{
                  xs: 12,
                  md: 4,
                }}
                sx={{
                  display: "grid",
                  width: "100%",
                  gap: 4,
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <M.Box sx={{ gridArea: "playerX" }}>
                  <PlayerCard player="X" />
                </M.Box>
                <M.Box
                  sx={{
                    gridArea: "board",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <M.Box
                    sx={{
                      background: "rgba(28, 28, 28, 0.5)",
                      backdropFilter: "blur(43px)",
                      borderRadius: 4,
                      width: "100%",
                      p: 3,
                    }}
                    maxWidth={{
                      sm: 400,
                      md: "100%",
                    }}
                  >
                    <M.Stack
                      sx={{
                        background:
                          "url(/assets/svg/board.svg) no-repeat center",
                        backgroundSize: "cover",
                        display: "grid",
                        gridTemplateAreas: `". . ." ". . ." ". . ."`,
                        gap: 2,
                      }}
                    >
                      {renderBoard}
                    </M.Stack>
                  </M.Box>
                </M.Box>
                <M.Grid sx={{ gridArea: "playerO" }}>
                  <PlayerCard player="O" />
                </M.Grid>
              </M.Box>
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
