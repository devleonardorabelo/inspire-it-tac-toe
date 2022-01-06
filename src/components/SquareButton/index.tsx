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
        height: "20vw",
        width: "20vw",
        maxWidth: 180,
        maxHeight: 180,
      }}
      onClick={props.onClick}
    >
      {props.value && (
        <img
          height="80%"
          alt={String(props.value)}
          src={`/assets/svg/${props.value}.svg`}
          style={{
            filter:
              props.value === "X"
                ? "drop-shadow(0px 0px 8px rgba(27, 217, 239, 0.65)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))"
                : "drop-shadow(0px 0px 8px rgba(252, 142, 233, 0.65)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))",
          }}
        />
      )}
    </M.Button>
  )
}
export default SquareButton
