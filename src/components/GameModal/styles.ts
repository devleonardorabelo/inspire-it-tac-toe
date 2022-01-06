import { SxProps, Theme } from "@mui/material"
import { Icon } from "../../types"

// ? MATERIAL STYLES ? //
export const modal: SxProps<Theme> = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  alignItems: "center",
}

export const card: SxProps<Theme> = { p: 4, pb: 0, borderRadius: 4, mb: 4 }

// ? CSS STYLES ? //
export const icon = (icon: Icon): React.CSSProperties => ({
  height: 80,
  width: 80,
  marginBottom: -40,
  zIndex: 2,
  filter:
    icon === "X"
      ? "drop-shadow(0px 0px 8px rgba(27, 217, 239, 0.65)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))"
      : "drop-shadow(0px 0px 8px rgba(252, 142, 233, 0.65)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))",
})

export const scoreIcon: React.CSSProperties = {
  height: "24px",
  width: "24px",
}
