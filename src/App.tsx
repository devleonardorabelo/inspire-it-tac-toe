import React from "react"
import * as M from "@mui/material"

//? STATES ?//
import { currentGame } from "./redux/store"
import { useAppSelector } from "./redux/hooks"

// ? COMPONENTS ?//
import { GameModal, WaitingModal } from "./components"
import { Start, Started } from "./views"

import "./styles.css"

const App = () => {
  const { game, connected } = useAppSelector(currentGame)

  return (
    <>
      <GameModal open={game.draw || !!game.winner?.nickname} />
      <WaitingModal open={connected && game.players.length !== 2} />
      <M.Container
        sx={{
          minHeight: "100vh",
          overflow: "y",
        }}
      >
        {connected ? <Started /> : <Start />}
      </M.Container>
    </>
  )
}

export default App
