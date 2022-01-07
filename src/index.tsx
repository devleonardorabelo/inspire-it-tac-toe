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
    primary: {
      main: "#1BD9EF",
    },
    success: {
      main: "#1BEF63",
    },
    info: {
      main: "#1BD9EF",
    },
    error: {
      main: "#EF1B1B",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(28, 28, 28, 0.7)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
        contained: {
          fontWeight: "bold",
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
