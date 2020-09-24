import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import { api } from "./AxiosService"
import { socketService } from "../services/socketService"

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    collabBoards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    comments: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setCollabBoards(state, data) {
      state.collabBoards = data
    },
    setActive(state, board) {
      state.activeBoard = board
    },
    deleteBoard(state, id) {
      state.boards = state.boards.filter(b => b.id != id)
    },
    setLists(state, list) {
      state.lists = list
    },
    deleteList(state, id) {
      state.lists = state.lists.filter(l => l.id != id)
    },
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.id, payload.data)
    },
    deleteTask(state, task) {
      state.tasks[task.listId] = state.tasks[task.listId].filter(t => t.id != task.id)
    },
    setComments(state, payload) {
      Vue.set(state.comments, payload.id, payload.data)
    },
    deleteComment(state, comment) {
      state.comments[comment.taskId] = state.comments[comment.taskId].filter(c => c.id != comment.id)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    getCollabBoards({ commit, dispatch }) {
      api.get('boards/others')
        .then(res => {
          commit('setCollabBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    getBoardByID({ commit }, id) {
      api.get('boards/' + id)
        .then(res => {
          commit('setActive', res.data)
        })
    },
    getCollabBoardByID({ commit }, id) {
      api.get('boards/others/' + id)
        .then(res => {
          commit('setActive', res.data)
        })
    },
    editBoard({ commit }, board) {
      api.put(`boards/${board.id}`, board)
        .then(res => { commit('setActive', res.data) })
    },
    async deleteBoard({ commit }, id) {
      await api.delete('boards/' + id)
      router.push({ name: "boards" })
    },

    async deleteBoardMain({ commit }, id) {
      await api.delete('boards/' + id)
        .then(b => {
          commit('deleteBoard', id)
        })
    },
    async removeSelfCollab({ dispatch }, id) {
      await api.put("boards/collab/" + id)
        .then(c => {
          router.push({ name: "boards" })
        })
    },

    //#endregion


    //#region -- LISTS --
    getLists({ commit, dispatch }, id) {
      api.get("boards/" + id + "/lists")
        .then(res => {
          commit('setLists', res.data)
        })
    },
    addList({ commit, dispatch }, list) {
      api.post('lists', list)
        .then(l => {
          dispatch('getLists', list.boardId)
        })
    },
    deleteList({ commit, dispatch }, id) {
      api.delete('lists/' + id)
        .then(res => {
          commit("deleteList", id)
        })
    },
    editList({ dispatch }, list) {
      api.put(`lists/${list.id}`, list)
        .then(l => { dispatch("getLists", list.boardId) })
    },

    //#region -- TASKS --
    getTasks({ commit, dispatch }, id) {
      api.get("lists/" + id + "/tasks")
        .then(res => {
          commit('setTasks', { data: res.data, id })
        })
    },
    addTask({ commit, dispatch }, task) {
      api.post('tasks', task)
        .then(t => {
          dispatch('getTasks', task.listId)
        })
    },
    deleteTask({ commit, dispatch }, task) {
      api.delete('tasks/' + task.id)
        .then(res => {
          commit("deleteTask", task)
        })
    },
    editTask({ dispatch }, task) {
      api.put(`tasks/${task.id}`, task)
        .then(t => { dispatch("getTasks", task.listId) })
    },
    moveTask({ dispatch }, payload) {
      api.put(`tasks/${payload.task.id}`, { listId: payload.newListId })
        .then(t => {
          dispatch("getTasks", payload.newListId);
          dispatch("getTasks", payload.task.listId)
        })
    },
    //#endregion

    //#region -- COMMENTS --
    getComments({ commit, dispatch }, id) {
      api.get("tasks/" + id + "/comments")
        .then(res => {
          commit('setComments', { data: res.data, id })
        })
    },
    addComment({ commit, dispatch }, comment) {
      api.post('comments', comment)
        .then(t => {
          dispatch('getComments', comment.taskId)
        })
    },
    deleteComment({ commit, dispatch }, comment) {
      api.delete('comments/' + comment.id)
        .then(res => {
          commit("deleteComment", comment)
        })
    },
    editComment({ dispatch }, comment) {
      api.put(`comments/${comment.id}`, comment)
        .then(t => { dispatch("getComments", comment.taskId) })
    }
    //#endregion
  },
  modules: {
    socketService
  }
})
