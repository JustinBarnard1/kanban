<template>
  <div class="boards bg-boards container-fluid">
    <h1 class="text-light my-3">Welcome {{profile.name}},</h1>
    <h1 class="text-light" v-if="boards.length == 0">To Get Started, Create A Board.</h1>
    <form @submit.prevent="addBoard">
      <input class="bg-light" type="text" placeholder="title" v-model="newBoard.title" required />
      <input class="bg-light" type="text" placeholder="description" v-model="newBoard.description" />
      <button type="submit" class="btn text-light border">Create Board</button>
    </form>
    <button @click="myBoards = !myBoards" type="button" class="btn btn-primary">toggle boards</button>
    <div>
      <div class="row d-flex justify-content-center mt-3" v-if="myBoards">
        <div class="col-3 card mx-5 my-3 bg-warning" v-for="board in boards" :key="board.id">
          <div class="card-body">
            <router-link :to="{name: 'board', params: {boardId: board.id}}">
              <h1>{{board.title}}</h1>
            </router-link>
            <p class="card-text">{{board.description}}</p>
            <i>
              <p
                class="card-text text-danger d-flex justify-content-end"
                @click="deleteBoard(board.id)"
              >Delete</p>
            </i>
          </div>
        </div>
      </div>
      <div v-else class="row d-flex justify-content-center mt-3">
        <div
          class="col-3 card mx-5 my-3 bg-warning"
          v-for="oboard in collabBoards"
          :key="oboard.id"
        >
          <div class="card-body">
            <router-link :to="{name: 'board', params: {boardId: oboard.id}}">
              <h1>{{oboard.title}}</h1>
            </router-link>
            <p class="card-text">{{oboard.description}}</p>
            <h4>{{oboard.creatorEmail}}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import as from "../services/alertsService";
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getCollabBoards");
    this.$store.dispatch("joinRoom", "ships");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: "",
      },
      myBoards: true,
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
    profile() {
      return this.$auth.userInfo;
    },
    collabBoards() {
      return this.$store.state.collabBoards;
    },
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    async deleteBoard(id) {
      if (await as.confirmAction()) {
        this.$store.dispatch("deleteBoardMain", id);
      }
    },
  },
};
</script>
<style scoped>
.bg-boards {
  background-image: url("https://i.redd.it/jgrh8jdnbiu41.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  flex-grow: 1;
}
</style>