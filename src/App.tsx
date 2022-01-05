import React from "react"
import * as M from "@mui/material"
import { SquareButton } from "./components"
import { useDispatch, useSelector } from "react-redux"
import { setGame, resetGame } from "./redux/save"
import { FINISH_TEMPLATE } from "./constants"

function App() {
  const { squares, players } = useSelector((state: any) => state.game)
  const dispatch = useDispatch()

  const nextValue = React.useMemo(() => {
    return squares.filter(Boolean).length % 2 === 0 ? players[0] : players[1]
  }, [players, squares])

  const winner = React.useMemo(() => {
    for (let i = 0; i < FINISH_TEMPLATE.length; i++) {
      const [a, b, c] = FINISH_TEMPLATE[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }, [squares])

  const status = React.useMemo(() => {
    return winner
      ? `Vencedor: ${winner}`
      : squares.every(Boolean)
      ? "Empate"
      : `Jogador da vez: ${nextValue.name}`
  }, [nextValue, squares, winner])

  const selectSquare = React.useCallback(
    (square: any) => {
      if (winner || squares[square]) {
        return
      }
      const squaresCopy = [...squares]
      squaresCopy[square] = nextValue.icon
      dispatch(setGame(squaresCopy))
    },
    [dispatch, nextValue, squares, winner]
  )

  const restart = React.useCallback(() => dispatch(resetGame()), [dispatch])

  // ? RENDER ? //
  const renderSquare = React.useCallback(
    (pos: number) => {
      return (
        <SquareButton value={squares[pos]} onClick={() => selectSquare(pos)} />
      )
    },
    [selectSquare, squares]
  )

  const renderFrameRow = React.useCallback(
    (startPos: number) => (
      <M.Stack direction="row">
        {[...Array(3)].map((_, index) => renderSquare(startPos + index))}
      </M.Stack>
    ),
    [renderSquare]
  )

  return (
    <M.Container sx={{ maxHeight: "100vh" }}>
      <M.Stack direction="row">
        <M.Box>
          <M.Avatar>1</M.Avatar>
          <M.Typography>{players[0].name}</M.Typography>
          <M.Typography className="status">{status}</M.Typography>
          <M.Button variant="contained" onClick={restart}>
            Restart
          </M.Button>
        </M.Box>

        <M.Stack>
          {renderFrameRow(0)}
          {renderFrameRow(3)}
          {renderFrameRow(6)}
        </M.Stack>
        <M.Box>
          <M.Avatar>2</M.Avatar>
          <M.Typography>{players[1].name}</M.Typography>
        </M.Box>
      </M.Stack>
    </M.Container>
  )
}

export default App
