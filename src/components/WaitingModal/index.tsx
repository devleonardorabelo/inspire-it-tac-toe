import React from "react"
import * as M from "@mui/material"
import * as I from "@mui/icons-material"
import { useAppSelector } from "../../redux/hooks"
import { currentGame } from "../../redux/store"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}
type Props = {
  open: boolean
}
const WaitingModal = (props: Props) => {
  const { game } = useAppSelector(currentGame)
  const [copied, setCopied] = React.useState(false)
  const copyToClipboard = React.useCallback(async () => {
    setCopied(true)
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(String(game.room))
    } else {
      return document.execCommand("copy", true, String(game.room))
    }
  }, [game.room])
  return (
    <M.Modal open={props.open}>
      <M.Stack sx={{ ...style, alignItems: "center" }}>
        <M.Card sx={{ background: "rgba(28, 28, 28, 0.7)" }}>
          <M.CardContent>
            <M.Stack p={2} spacing={1} alignItems="center">
              <img
                alt=""
                src="/assets/svg/O.svg"
                style={{
                  height: 36,
                  width: 36,
                }}
              />
              <M.Typography variant="h5">Waiting Player...</M.Typography>
              <M.Divider />
              <M.Typography variant="subtitle2">
                Invite another player
              </M.Typography>
              <M.Chip
                color={copied ? "success" : "default"}
                label={game.room}
                sx={{ p: 2 }}
                onClick={copyToClipboard}
                icon={
                  copied ? (
                    <I.Done sx={{ width: "16px" }} />
                  ) : (
                    <I.FileCopy sx={{ width: "16px" }} />
                  )
                }
              />
            </M.Stack>
          </M.CardContent>
        </M.Card>
      </M.Stack>
    </M.Modal>
  )
}

export default WaitingModal
