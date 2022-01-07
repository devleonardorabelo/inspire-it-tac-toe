import React from "react"
import io, { Socket } from "socket.io-client"

// ? STATES ? //
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  resetGame,
  resetStatus,
  setGame,
  setIsConnected,
  setSocketConnection,
  setStatus,
} from "../../redux/save"
import { currentGame } from "../../redux/store"

import type { Game } from "../../types"

const useSocket = () => {
  const [socket, setSocket] = React.useState<Socket | null>(null)
  const { room, nickname } = useAppSelector(currentGame)
  const dispatch = useAppDispatch()

  const restart = React.useCallback(
    () => socket?.emit("restart", room),
    [socket, room]
  )

  const selectSquare = React.useCallback(
    (pos: number) => {
      socket?.emit("move", { pos, room, nickname })
    },
    [nickname, room, socket]
  )

  const startGame = React.useCallback(() => {
    socket?.emit("enterTheRoom", { room, nickname })
  }, [nickname, room, socket])

  const leaveGame = React.useCallback(() => {
    socket?.emit("leave", { room, nickname })
  }, [nickname, room, socket])

  const initSocket = React.useCallback(() => {
    const socketClient = io(process.env.REACT_APP_SOCKET_URL || "", {
      transports: ["websocket"],
    })
    // ? CONNECTION ? //
    socketClient.on("connect", () => {
      console.log("conectado")
      dispatch(setSocketConnection(true))
    })
    socketClient.on("disconnect", () => {
      dispatch(resetGame())
      dispatch(setIsConnected(false))
      console.log("desconectou")
      dispatch(setSocketConnection(false))
    })
    // ? EVENTS ? //
    socketClient.on("connected", () => {
      dispatch(setIsConnected(true))
    })
    socketClient.on("board", (e: Game) => {
      dispatch(setGame(e))
    })
    socketClient.on("leaveGame", (e) => {
      dispatch(resetGame())
      dispatch(setIsConnected(false))
    })
    socketClient.on("status", (e) => {
      dispatch(setStatus(e))
      setTimeout(() => {
        dispatch(resetStatus())
      }, 3000)
    })
    setSocket(socketClient)
  }, [dispatch])

  React.useEffect(() => {
    initSocket()
  }, [initSocket])

  return { restart, selectSquare, startGame, leaveGame }
}

export default useSocket
