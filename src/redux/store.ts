import { configureStore } from "@reduxjs/toolkit"
import squareReducer from "./save"

export default configureStore({
  reducer: {
    game: squareReducer,
  },
})
