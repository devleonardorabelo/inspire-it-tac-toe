import React from "react"
import * as M from "@mui/material"
import { GameModal, WaitingModal } from "./components"
import io, { Socket } from "socket.io-client"
import { Game } from "./types"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { currentGame } from "./redux/store"
import { setGame, setIsConnected } from "./redux/save"
import "./styles.css"
import { Start, Started } from "./views"

function App() {
  const [socket, setSocket] = React.useState<Socket | null>(null)
  const { game, room, connected } = useAppSelector(currentGame)
  const dispatch = useAppDispatch()

  const restart = React.useCallback(
    () => socket?.emit("restart", room),
    [socket, room]
  )

  React.useEffect(() => {
    const socketClient = io("http://192.168.1.5:3001/", {
      transports: ["websocket"],
    })
    socketClient.on("board", (e: Game) => dispatch(setGame(e)))
    socketClient.on("connection", () => {
      dispatch(setIsConnected(true))
    })
    setSocket(socketClient)
  }, [dispatch])

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
        {connected ? <Started socket={socket} /> : <Start socket={socket} />}
      </M.Container>
    </>
  )
}

export default App
