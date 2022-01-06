import React from "react"
import * as M from "@mui/material"

import { useAppSelector } from "../../redux/hooks"
import { currentGame } from "../../redux/store"
import useSocket from "../../hooks/socket"

import { Icon } from "../../types"
import * as styles from "./styles"

type Props = {
  open: boolean
}
const GameModal = (props: Props) => {
  const { game } = useAppSelector(currentGame)
  const { restart } = useSocket()
  const renderScore = React.useCallback(
    (icon: Icon) => (
      <M.Box>
        <img
          alt={String(icon)}
          src={`/assets/svg/${icon}.svg`}
          style={styles.scoreIcon}
        />
        <M.Typography>
          {game.history.filter((e) => e === icon).length}
        </M.Typography>
      </M.Box>
    ),
    [game.history]
  )
  return (
    <M.Modal open={props.open}>
      <M.Stack sx={styles.modal}>
        {game.winner && (
          <img
            alt={String(game.winner.icon)}
            src={`/assets/svg/${game.winner.icon}.svg`}
            style={styles.icon(game.winner.icon)}
          />
        )}
        <M.Card sx={styles.card}>
          <M.CardContent sx={{ pt: 3 }}>
            <M.Box justifyContent="center" textAlign="center">
              {game.winner && (
                <M.Typography variant="h3">
                  {game.winner?.nickname.toUpperCase()}
                </M.Typography>
              )}
              <M.Typography variant="h6" sx={{ marginTop: "-8px", mb: 2 }}>
                {game.draw ? "DRAW" : "WINNER"}
              </M.Typography>
              <M.Divider />
              <M.Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="center"
                spacing={1}
                p={2}
                pb={0}
              >
                {renderScore("X")}
                <M.Typography sx={{ paddingBottom: "1px" }}>
                  <strong>x</strong>
                </M.Typography>
                {renderScore("O")}
              </M.Stack>
            </M.Box>
          </M.CardContent>
        </M.Card>
        <M.Button sx={{ px: 4 }} variant="contained" onClick={restart}>
          PLAY AGAIN
        </M.Button>
      </M.Stack>
    </M.Modal>
  )
}

export default GameModal
