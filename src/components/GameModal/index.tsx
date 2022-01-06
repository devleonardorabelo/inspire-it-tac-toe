import React from "react"
import * as M from "@mui/material"
import { useAppSelector } from "../../redux/hooks"
import { currentGame } from "../../redux/store"
import { Icon } from "../../types"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}
type Props = {
  open: boolean
  onSubmit: () => void
}
const GameModal = (props: Props) => {
  const { game } = useAppSelector(currentGame)

  const renderScore = React.useCallback(
    (icon: Icon) => (
      <M.Box>
        <img
          alt={String(icon)}
          src={`/assets/svg/${icon}.svg`}
          style={{
            height: 24,
            width: 24,
          }}
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
      <M.Stack sx={{ ...style, alignItems: "center" }}>
        {game.winner && (
          <img
            alt={String(game.winner.icon)}
            src={`/assets/svg/${game.winner.icon}.svg`}
            style={{
              height: 80,
              width: 80,
              marginBottom: -40,
              zIndex: 2,
              filter:
                game.winner.icon === "X"
                  ? "drop-shadow(0px 0px 8px rgba(27, 217, 239, 0.65)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))"
                  : "drop-shadow(0px 0px 8px rgba(252, 142, 233, 0.65)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))",
            }}
          />
        )}
        <M.Card sx={{ p: 4, pb: 0, borderRadius: 4, mb: 4 }}>
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
        <M.Button sx={{ px: 4 }} variant="contained" onClick={props.onSubmit}>
          PLAY AGAIN
        </M.Button>
      </M.Stack>
    </M.Modal>
  )
}

export default GameModal
