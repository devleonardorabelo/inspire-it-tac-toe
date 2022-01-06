import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import squareReducer from "./save"

const store = configureStore({
  reducer: {
    game: squareReducer,
  },
})

export const currentGame = (state: RootState) => state.game

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
