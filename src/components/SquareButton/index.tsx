import * as React from "react"
import * as M from "@mui/material"

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
        aspectRatio: "1/1",
        background: props.value
          ? `url(/assets/svg/${props.value}.svg) no-repeat center`
          : "none",
        backgroundSize: "70%",
      }}
      onClick={props.onClick}
    ></M.Button>
  )
}
export default SquareButton
