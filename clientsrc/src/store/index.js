import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import { api } from "./AxiosService"

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActive(state, board){
      state.activeBoard = board
    },
    setLists(state, list){
      state.lists = list
    },
    deleteList(state, id){
      state.lists = state.lists.filter(l => l.id != id)
    },
    setTasks(state, payload){
      // state.tasks[tasks[0].listId]  = tasks
      Vue.set(state.tasks, payload.id, payload.data)
    },
    deleteTask(state, task){
      state.tasks[task.listId] = state.tasks[task.listId].filter(t => t.id != task.id)
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
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    getBoardByID({commit}, id){
      api.get('boards/'+id)
      .then(res => {
        commit('setActive', res.data)
      })
    },
    async deleteBoard({commit}, id){
      await api.delete('boards/'+id)
      router.push({name:"boards"})
    },
    
    //#endregion


    //#region -- LISTS --
getLists({commit, dispatch}, id){
  api.get("boards/" + id + "/lists")
  .then(res => {
    commit('setLists', res.data)
  })
},
addList({commit, dispatch}, list){
  api.post('lists', list)
  .then(l => {
    dispatch('getLists', list.boardId)
  })
},
deleteList({commit, dispatch}, id){
  api.delete('lists/' + id)
  .then(res => {
    commit("deleteList", id)
  })
},
editList({dispatch}, list){
  api.put(`lists/${list.id}`, list)
  .then(l => {dispatch("getLists", list.boardId)})
},

//#region -- TASKS --
getTasks({commit, dispatch}, id){
  api.get("lists/" + id + "/tasks")
  .then(res => {
    commit('setTasks', {data:res.data, id})
  })
},
addTask({commit, dispatch}, task){
  api.post('tasks', task)
  .then(t => {
    dispatch('getTasks', task.listId)
  })
},
deleteTask({commit, dispatch}, task){
  api.delete('tasks/' + task.id)
  .then(res => {
    commit("deleteTask", task)
  })
},
editTask({dispatch}, task){
  api.put(`tasks/${task.id}`, task)
  .then(t => {dispatch("getTasks", task.listId)})
}
    //#endregion

    //#region -- COMMENTS --
    
    //#endregion
  }
})
