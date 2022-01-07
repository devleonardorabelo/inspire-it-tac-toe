import React from "react"
import * as M from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setNickname, setRoom } from "../../redux/save"
import { currentGame } from "../../redux/store"
import { Modal } from "../../design"
import useSocket from "../../hooks/socket"

const initialStatus = { message: "", input: "", error: "" }
const Start = () => {
  const { room, nickname, status } = useAppSelector(currentGame)
  const { startGame } = useSocket()
  const [validation, setValidation] = React.useState(initialStatus)
  const randomRoom = React.useMemo(
    () =>
      (Math.random() + 1).toString(36).substring(6).toUpperCase().slice(0, 6),
    []
  )
  const dispatch = useAppDispatch()
  const createRoom = React.useCallback(() => {
    if (nickname.length >= 9 || nickname.length <= 2) {
      return setValidation({
        message: "Invalid Nickname",
        input: "nickname",
        error: "Your nickname must be 3 to 8 characters long.",
      })
    }
    if (String(room).length <= 5) {
      return setValidation({
        message: "Invalid Room ID",
        input: "room",
        error: "Invalid Room ID",
      })
    }
    setValidation(initialStatus)
    startGame()
  }, [nickname.length, room, startGame])

  React.useEffect(() => {
    dispatch(setRoom(randomRoom))
  }, [dispatch, randomRoom])

  return (
    <>
      <M.Snackbar open={!!validation.message}>
        <M.Alert severity="error">{validation.error}</M.Alert>
      </M.Snackbar>
      <M.Snackbar open={!!status.message}>
        <M.Alert severity={status.type}>{status.message}</M.Alert>
      </M.Snackbar>
      <M.Snackbar open={!!validation.message}>
        <M.Alert severity="error">{validation.error}</M.Alert>
      </M.Snackbar>
      <Modal open={true}>
        <M.Stack spacing={2}>
          <M.TextField
            onChange={(e) =>
              dispatch(setNickname(e.target.value.toUpperCase()))
            }
            label="Nickname"
            sx={{ minWidth: 200 }}
            error={validation.input === "nickname"}
            helperText={
              validation.input === "nickname" ? validation.message : null
            }
            value={nickname}
            inputProps={{
              maxLength: 8,
            }}
          />
          <M.TextField
            onChange={(e) => dispatch(setRoom(e.target.value.toUpperCase()))}
            label="Room ID"
            sx={{ minWidth: 200 }}
            error={validation.input === "room"}
            helperText={validation.input === "room" ? validation.message : null}
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
