import * as React from "react"
import * as M from "@mui/material"
type Props = {
  value: string | null
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
const SquareButton = (props: Props) => {
  return (
    <M.Button
      variant="outlined"
      fullWidth
      sx={{ height: "20vw", width: "20vw", maxWidth: 180, maxHeight: 180 }}
      onClick={props.onClick}
    >
      {props.value}
    </M.Button>
  )
}
export default SquareButton
