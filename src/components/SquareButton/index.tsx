import * as React from "react"
import "./styles.css"
type Props = {
  value: string | null
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
const SquareButton = (props: Props) => {
  return (
    <span
      className="square"
      style={{
        aspectRatio: "1/1",
        background: props.value
          ? `url(/assets/svg/${props.value}.svg) no-repeat center center / 70%`
          : "none",

        display: "block",
        width: "10vw",
        height: "10vw",
        minWidth: "100px",
        minHeight: "100px",
      }}
      onClick={props.onClick}
    ></span>
  )
}
export default SquareButton
