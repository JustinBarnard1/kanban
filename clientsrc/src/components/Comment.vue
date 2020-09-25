<template>
  <div class="mx-2 mb-2">
    <li class="offset-1 card">
      <p
        class="d-flex justify-content-left p-2"
        v-if="!editing"
        @click="editBody"
      >{{commentProp.body}}</p>
      <form @submit.prevent="editFinish" v-if="editing" class="form-inline">
        <div class="form-group">
          <input
            style="max-width: 13em;"
            v-model="comment.body"
            type="text"
            name
            class="form-control"
            placeholder
            aria-describedby="helpId"
          />
        </div>
        <button type="submit" class="btn btn-success">Done</button>
        <small>
          <i class="ml-3 text-danger" @click="deleteComment">Delete</i>
        </small>
      </form>
    </li>
  </div>
</template>

<script>
export default {
  props: ["commentProp"],
  data() {
    return {
      editing: false,
      comment: {},
    };
  },
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.commentProp);
    },
    editBody() {
      this.editing = true;
      this.comment = this.commentProp;
    },
    editFinish() {
      this.$store.dispatch("editComment", this.comment);
      this.editing = false;
    },
  },
};
</script>

<style>
</style>