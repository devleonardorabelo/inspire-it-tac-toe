import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import store from "./redux/store"

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(28, 28, 28, 0.5)",
          border: "px solid rgba(102, 102, 102, 0.3)",
          backdropFilter: "blur(43px)",
          borderRadius: 8,
        },
      },
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
