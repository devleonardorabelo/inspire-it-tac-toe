import React from "react"
import * as M from "@mui/material"

import { useAppSelector } from "../../redux/hooks"
import { currentGame } from "../../redux/store"

import { Icon } from "../../types"

import * as styles from "./styles"
import "./styles.css"

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
          style={styles.scoreIcon}
        />
      </M.Stack>
    ),
    [game.history, playerData?.icon]
  )
  return (
    <M.Stack
      alignItems="center"
      sx={styles.card(game.turn === playerData?.nickname)}
    >
      <M.Stack sx={styles.iconContainer}>
        {game.turn === playerData?.nickname && (
          <img
            alt=""
            src={`/assets/svg/arrow.svg`}
            style={styles.turnIndicator}
          />
        )}
        <img
          alt={String(props.player)}
          src={`/assets/svg/${props.player}.svg`}
          style={styles.icon(props.player)}
        />
      </M.Stack>

      <M.Card
        sx={{
          width: "100%",
          background: "transparent !important",
        }}
      >
        <M.CardContent sx={{ background: "transparent" }}>
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
