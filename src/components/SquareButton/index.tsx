import * as React from "react"
import * as M from "@mui/material"
import "./styles.css"

type Props = {
  value: string | null
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
const SquareButton = (props: Props) => {
  return (
    <M.Button
      variant="text"
      fullWidth
      sx={{
        aspectRatio: "1",
        backgroundImage: props.value
          ? `url(/assets/svg/${props.value}.svg)`
          : "none",
        animation: "bubble .3s forwards",
      }}
      onClick={props.onClick}
    ></M.Button>
  )
}
export default SquareButton
