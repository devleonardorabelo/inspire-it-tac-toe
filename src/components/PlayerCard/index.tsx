import React from "react"

import * as M from "@mui/material"

import { useAppSelector } from "../../redux/hooks"
import { currentGame } from "../../redux/store"
import { Icon } from "../../types"
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
    <M.Stack
      alignItems="center"
      sx={{
        width: "100%",
        transition: "1s",
        background: "rgba(28, 28, 28, 0.7)",
        border: "1 px solid rgba(102, 102, 102, 0.3)",
        borderRadius: 4,
        backdropFilter: "blur(8px) !important",
        filter:
          game.turn === playerData?.nickname
            ? "grayscale(0) brightness(1)"
            : "grayscale(1) brightness(0.5)",
      }}
    >
      <M.Stack
        sx={{
          zIndex: 2,
          marginTop: "-40px",
        }}
      >
        {game.turn === playerData?.nickname && (
          <img
            alt=""
            src={`/assets/svg/arrow.svg`}
            style={{
              height: 36,
              width: 36,
              position: "absolute",
              top: -60,
              alignSelf: "center",
              zIndex: 2,
              animation: "slide 2s infinite",
            }}
          />
        )}
        <img
          alt={String(props.player)}
          src={`/assets/svg/${props.player}.svg`}
          style={{
            height: 80,
            width: 80,
            filter:
              props.player === "X"
                ? "drop-shadow(0px 0px 8px rgba(27, 217, 239, 0.65)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))"
                : "drop-shadow(0px 0px 8px rgba(252, 142, 233, 0.65)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))",
          }}
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
