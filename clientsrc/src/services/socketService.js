import io from "socket.io-client"

let socket = {};

export const socketService = {
  actions: {
    initializeSocket({ commit, dispatch, state }) {
      socket = io("//localhost:3000");
      socket.on("CONNECTED", data => {
      })
      //registers additional listeners for client side here
      socket.on("updateBoards", data => {      
        dispatch("getBoards")
        dispatch("getCollabBoards")
      })
      socket.on("updateLists", data => {
        dispatch("getLists", data.boardId)
      })
      socket.on("updateTasks", data => {
        dispatch("getTasks", data.listId)
      })
      socket.on("moveTask", data => {
        dispatch("getTasks", data.listId)
        dispatch("getTasks", data.oldListId)

      })
      socket.on("updateComments", data => {
        dispatch("getComments", data.taskId)
      })
      socket.on("deleteShip", data => {
        commit("removeShip")
      })
    },
    joinRoom({ commit, dispatch }, roomName) {
      socket.emit("dispatch", { action: "JoinRoom", data: roomName })
    },
    leaveRoom({ commit, dispatch }, roomName) {
      socket.emit("disconnect", { action: "LeaveRoom", data: roomName })
    }
  }
}