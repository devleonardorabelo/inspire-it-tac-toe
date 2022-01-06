import { SxProps, Theme } from "@mui/material"
import React from "react"
import { Icon } from "../../types"

// ? MATERIAL STYLES ? //
export const card = (active: boolean): SxProps<Theme> => ({
  width: "100%",
  transition: "1s",
  background: "rgba(28, 28, 28, 0.7)",
  borderRadius: 4,
  backdropFilter: "blur(8px) !important",
  filter: active
    ? "grayscale(0) brightness(1)"
    : "grayscale(1) brightness(0.5)",
})

export const iconContainer: SxProps<Theme> = {
  zIndex: 2,
  marginTop: "-40px",
}

// ? CSS STYLES ? //
export const icon = (icon: Icon): React.CSSProperties => ({
  height: 80,
  width: 80,
  filter:
    icon === "X"
      ? "drop-shadow(0px 0px 8px rgba(27, 217, 239, 0.65)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))"
      : "drop-shadow(0px 0px 8px rgba(252, 142, 233, 0.65)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))",
})

export const turnIndicator: React.CSSProperties = {
  height: "36px",
  width: "36px",
  position: "absolute",
  top: "-60px",
  alignSelf: "center",
  zIndex: "2",
  animation: "slide 2s infinite",
}

export const scoreIcon: React.CSSProperties = {
  height: "24px",
  width: "24px",
}
