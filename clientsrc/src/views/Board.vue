<template>
  <div class="board bg-board container-fluid">
    <div class="row">
      <div class="offset-4 col-4 text-light mt-2" v-if="board.title">
        <h1 @click="editTitle" v-if="!editing">{{board.title}}</h1>
        <form @submit.prevent="editFinish" v-else class="form-inline d-flex justify-content-center">
          <div class="form-group">
            <input
              v-model="board.title"
              type="text"
              name
              id
              class="form-control"
              placeholder
              aria-describedby="helpId"
            />
          </div>
          <button type="submit" class="btn btn-success">Done</button>
        </form>
        <h3>{{board.description}}</h3>
        <form class="form-inline d-flex justify-content-center mt-2" @submit.prevent="addList">
          <div class="form-group">
            <label for></label>
            <input
              v-model="newList.title"
              type="text"
              name
              id
              class="form-control"
              placeholder="Title"
              aria-describedby="helpId"
            />
            <button type="submit" class="btn btn-primary">Add New List</button>
          </div>
        </form>
      </div>
      <div class="col-4 mt-2">
        <div class="collabList">
          <div class="card bg-warning pl-4">
            <li class="text-left" v-for="collab in collabs" :key="collab" @click="activeCollab = collab">{{collab}}</li>
          </div>
        </div>
        <form
          v-if="user == board.creatorEmail"
          class="form-inline d-flex justify-content-center mt-2"
          @submit.prevent="addCollab"
        >
          <div class="form-group">
            <label for></label>
            <input
              v-model="newCollab"
              type="email"
              name
              id
              class="form-control"
              placeholder="Email"
              aria-describedby="helpId"
            />
            <button :class="{disabled:!newCollab}"  type="submit" class="btn btn-primary">Add Collab</button>
            <button type="button" class="btn btn-danger" @click="removeCollab">Remove</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row mt-2">
      <list v-for="list in lists" :key="list.id" :listProp="list" />
    </div>
    <div class="row">
      <div class="offset-10 col-2 mt-3">
        <button @click="deleteBoard" type="button" class="btn btn-danger">Delet This Board</button>
      </div>
    </div>
  </div>
</template>

<script>
import List from "../components/List";
import as from "../services/alertsService";
export default {
  name: "board",
  data() {
    return {
      newList: {},
      newCollab: "",
      editing: false,
      eBoard: {},
      activeCollab:""
    };
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    },
    user() {
      return this.$auth.userInfo.email;
    },
    collabs() {
      return this.$store.state.activeBoard.collabs;
    },
  },
  props: ["boardId"],
  mounted() {
    this.$store.dispatch("getBoardByID", this.$route.params.boardId);
    this.$store.dispatch("getCollabBoardByID", this.$route.params.boardId);
    this.$store.dispatch("getLists", this.$route.params.boardId);
  },
  components: {
    List,
  },
  methods: {
    addList() {
      this.newList.boardId = this.$route.params.boardId;
      this.$store.dispatch("addList", this.newList);
      this.newList = {};
    },
    addCollab() {
      let newArr = this.board.collabs;
      newArr.push(this.newCollab);
      this.$store.dispatch("editBoard", { id: this.board.id, collabs: newArr });
      this.newCollab = "";
    },
    async deleteBoard() {
      if (await as.confirmAction()) {
        this.$store.dispatch("deleteBoard", this.board.id);
      }
    },
    editTitle() {
      this.editing = true;
      this.eBoard = this.board;
    },
    editFinish() {
      this.$store.dispatch("editBoard", this.eBoard);
      this.editing = false;
    },
    removeCollab(){
      let board = this.board
      board.collabs = board.collabs.filter(c => c != this.activeCollab)
      console.log(board)
      this.$store.dispatch("editBoard", board);
    }
  },
};
</script>
<style scoped>
.bg-board {
  background-image: url("https://i.redd.it/jgrh8jdnbiu41.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  flex-grow: 1;
}
.collabList {
  max-height: 12vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
li {
  list-style: none;
}
</style>
