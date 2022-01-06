import React from "react"
import * as M from "@mui/material"
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}
type Props = {
  open: boolean
  children: JSX.Element | JSX.Element[]
}
const Modal = (props: Props) => {
  return (
    <M.Modal open={props.open}>
      <M.Stack sx={{ ...style, alignItems: "center" }}>
        <M.Card sx={{ background: "rgba(28, 28, 28, 0.7)", p: 4 }}>
          <M.CardContent>{props.children}</M.CardContent>
        </M.Card>
      </M.Stack>
    </M.Modal>
  )
}

export default Modal
