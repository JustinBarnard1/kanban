<template>
  <div class="board">
    <div v-if="board.title">
    <h1>{{board.title}}</h1>
    <h4>{{board.description}}</h4>
    </div>
    <h1 v-else>Loading...</h1>
  </div>
</template>

<script>
export default {
  name: "board",
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    }
  },
  props: ["boardId"],
  mounted(){
    this.$store.dispatch('getBoardByID', this.$route.params.boardId)
  }
};
</script>
