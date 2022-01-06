import React from "react"
import * as M from "@mui/material"
import { Socket } from "socket.io-client"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setNickname, setRoom } from "../../redux/save"
import { currentGame } from "../../redux/store"
import { Modal } from "../../design"
import useSocket from "../../hooks/socket"

const initialStatus = { message: "", input: "", error: "" }
const Start = () => {
  const { room, nickname } = useAppSelector(currentGame)
  const { startGame } = useSocket()
  const [status, setStatus] = React.useState(initialStatus)
  const randomRoom = React.useMemo(
    () => (Math.random() + 1).toString(36).substring(6).toUpperCase(),
    []
  )
  const dispatch = useAppDispatch()
  const createRoom = React.useCallback(() => {
    if (nickname.length >= 9 || nickname.length <= 2) {
      return setStatus({
        message: "Invalid Nickname",
        input: "nickname",
        error: "Your nickname must be 3 to 8 characters long.",
      })
    }
    if (String(room).length <= 5) {
      return setStatus({
        message: "Invalid Room ID",
        input: "room",
        error: "Invalid Room ID",
      })
    }
    setStatus(initialStatus)
    startGame()
  }, [nickname.length, room, startGame])

  React.useEffect(() => {
    dispatch(setRoom(randomRoom))
  }, [dispatch, randomRoom])

  return (
    <>
      <M.Snackbar open={!!status.message}>
        <M.Alert severity="error">{status.error}</M.Alert>
      </M.Snackbar>
      <Modal open={true}>
        <M.Stack spacing={2}>
          <M.TextField
            onChange={(e) =>
              dispatch(setNickname(e.target.value.toUpperCase()))
            }
            label="Nickname"
            sx={{ minWidth: 200 }}
            error={status.input === "nickname"}
            helperText={status.input === "nickname" ? status.message : null}
            value={nickname}
            inputProps={{
              maxLength: 8,
            }}
          />
          <M.TextField
            onChange={(e) => dispatch(setRoom(e.target.value.toUpperCase()))}
            label="Room ID"
            sx={{ minWidth: 200 }}
            error={status.input === "room"}
            helperText={status.input === "room" ? status.message : null}
            defaultValue={randomRoom}
            value={room}
            inputProps={{
              maxLength: 6,
            }}
          />
          <M.Button size="large" variant="contained" onClick={createRoom}>
            PLAY NOW
          </M.Button>
        </M.Stack>
      </Modal>
    </>
  )
}

export default Start
