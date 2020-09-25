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
      socket.on("updateBoards", data => {
        // debugger
       
        dispatch("getBoards")
        dispatch("getCollabBoards")
      })
      socket.on("updateLists", data => {
        // debugger
        // console.log(data);
        dispatch("getLists", data.boardId)
      })
      socket.on("updateTasks", data => {
        // debugger
        // console.log(data);
        dispatch("getTasks", data.listId)
      })
      socket.on("moveTask", data => {
        // debugger
        console.log(data);
        dispatch("getTasks", data.listId)
        dispatch("getTasks", data.oldListId)

      })
      socket.on("updateComments", data => {
        // debugger
        // console.log(data);
        dispatch("getComments", data.taskId)
        // dispatch("getTasks", data.listId)
      })
      socket.on("deleteShip", data => {
        commit("removeShip")
      })
    },
    joinRoom({ commit, dispatch }, roomName) {
      socket.emit("dispatch", { action: "JoinRoom", data: roomName })
     console.log(roomName);
    },
    leaveRoom({ commit, dispatch }, roomName) {
      socket.emit("disconnect", { action: "LeaveRoom", data: roomName })
    }
  }
}