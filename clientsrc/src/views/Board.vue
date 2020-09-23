<template>
  <div class="board bg-board container-fluid">
    <div>
      <div class="text-light mt-2" v-if="board.title">
        <h1>{{board.title}}</h1>
        <h4>{{board.description}}</h4>
        <button @click="deleteBoard" type="button" class="btn btn-danger">Delet</button>
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
      <h1 v-else>Loading...</h1>
    </div>
    <div class="row mt-2">
      <list v-for="list in lists" :key="list.id" :listProp="list" />
    </div>
  </div>
</template>

<script>
import List from "../components/List";
export default {
  name: "board",
  data() {
    return {
      newList: {},
    };
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    },
  },
  props: ["boardId"],
  mounted() {
    this.$store.dispatch("getBoardByID", this.$route.params.boardId);
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
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.board.id);
    },
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
</style>
