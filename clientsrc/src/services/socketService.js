import io from "socket.io-client"

let socket = {};

export const socketService = {
  actions: {
    initializeSocket({ commit, dispatch, state }) {
      socket = io("//localhost:3000");
      socket.on("CONNECTED", data => {
        console.log(data.message + "sockets on")
      })
      //registers additional listeners for client side here
      socket.on("newShip", data => {
        commit("addShip", data)
      })

      socket.on("deleteShip", data => {
        commit("removeShip")
      })
    },
    joinRoom({ commit, dispatch }, roomName) {
      socket.emit("dispatch", { action: "joinRoom", data: roomName })
    },
    leaveRoom({ commit, dispatch }, roomName) {
      socket.emit("disconnect", { action: "leaveRoom", data: roomName })
    }
  }
}