import React from "react"
import * as M from "@mui/material"
import * as I from "@mui/icons-material"
import { useAppSelector } from "../../redux/hooks"
import { currentGame } from "../../redux/store"
import { Modal } from "../../design"

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
    <Modal open={props.open}>
      <M.Stack spacing={1} alignItems="center" textAlign="center">
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
        <M.Typography variant="subtitle2">Invite another player</M.Typography>
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
    </Modal>
  )
}

export default WaitingModal
