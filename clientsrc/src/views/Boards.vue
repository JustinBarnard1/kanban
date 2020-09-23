<template>
  <div class="boards bg-boards container-fluid">
    <h1 class="text-light my-3">Welcome {{profile.name}},</h1>
    <h1 class="text-light" v-if="boards.length == 0">To Get Started, Create A Board.</h1>
    <form @submit.prevent="addBoard">
      <input class="bg-light" type="text" placeholder="title" v-model="newBoard.title" required />
      <input class="bg-light" type="text" placeholder="description" v-model="newBoard.description" />
      <button type="submit" class="btn text-light border">Create Board</button>
    </form>
    <div class="row d-flex justify-content-center mt-3">
      <div class="col-3 card mx-5 my-3 bg-warning" v-for="board in boards" :key="board.id">
        <div class="card-body">
          <router-link :to="{name: 'board', params: {boardId: board.id}}">
            <h1>{{board.title}}</h1>
          </router-link>
          <p class="card-text">{{board.description}}</p>
          <i>
            <p class="card-text text-danger" @click="deleteBoard(board.id)">Delete</p>
          </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
    profile() {
      return this.$auth.userInfo;
    },
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    deleteBoard(id) {
      this.$store.dispatch("deleteBoardMain", id);
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