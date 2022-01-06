import React from "react"

import * as M from "@mui/material"

import { useAppSelector } from "../../redux/hooks"
import { currentGame } from "../../redux/store"
import { Icon } from "../../types"
type Props = {
  player: Icon
}
const PlayerCard = (props: Props) => {
  const { game } = useAppSelector(currentGame)
  const playerData = React.useMemo(
    () => game.players.find((e) => e.icon === props.player),
    [game.players, props.player]
  )

  const renderScore = React.useMemo(
    () => (
      <M.Stack alignItems="center" py={2}>
        <M.Typography>
          <strong>
            {game.history.filter((e) => e === playerData?.icon).length}
          </strong>
        </M.Typography>
        <img
          alt={String(playerData?.icon)}
          src={`/assets/svg/${playerData?.icon}.svg`}
          style={{
            height: 24,
            width: 24,
          }}
        />
      </M.Stack>
    ),
    [game.history, playerData?.icon]
  )
  return (
    <M.Stack direction="column" alignItems="center">
      <img
        alt={String(props.player)}
        src={`/assets/svg/${props.player}.svg`}
        style={{
          height: 80,
          width: 80,
          marginBottom: -40,
          zIndex: 2,
          filter:
            props.player === "X"
              ? "drop-shadow(0px 0px 8px rgba(27, 217, 239, 0.65)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))"
              : "drop-shadow(0px 0px 8px rgba(252, 142, 233, 0.65)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))",
        }}
      />
      <M.Card sx={{ paddingTop: "40px", px: 4 }}>
        <M.CardContent>
          <M.Box justifyContent="center" textAlign="center">
            {playerData ? (
              <>
                <M.Typography variant="caption">PLAYER</M.Typography>
                <M.Typography variant="h5">
                  {playerData?.nickname?.toUpperCase()}
                </M.Typography>
                {renderScore}
              </>
            ) : (
              <>
                <M.Typography variant="caption">AGUARDANDO</M.Typography>
                <M.Typography variant="h5">JOGADOR</M.Typography>
              </>
            )}
          </M.Box>
        </M.CardContent>
      </M.Card>
    </M.Stack>
  )
}

export default PlayerCard
