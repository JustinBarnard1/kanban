<template>
  <div class="mt-2" @dragstart="moveItem()">
    <li class="card bg-warning">
      <div class="col d-flex">
        <input
          v-if="!editing"
          class="checkbx mx-3 mt-2"
          @change="toggleComplete"
          v-model="checked"
          type="checkbox"
          name
          id
          autocomplete="off"
        />
        <p class="mt-2" v-if="!editing" @click="editBody">{{taskProp.body}}</p>
      </div>
      <form @submit.prevent="editFinish" v-if="editing" class="form-inline justify-content-center">
        <div class="form-group">
          <input
            v-model="task.body"
            type="text"
            name
            class="form-control"
            placeholder
            aria-describedby="helpId"
          />
        </div>
        <button type="submit" class="btn btn-success">Done</button>
        <small>
          <i class="ml-3 text-danger" @click="deleteTask">Delete</i>
        </small>
      </form>
      <div v-if="commentsShow">
      <comment v-for="comment in comments" :key="comment.id" :commentProp="comment" />
      </div>
      <small v-else @click="commentsShow = !commentsShow"><i><p>Comments ({{comments.length}})</p></i></small>
      <small v-if="commentsShow" @click="commentsShow = !commentsShow"><i><p>Hide</p></i></small>
      <form v-if="commentsShow" class="form-inline" @submit.prevent="addComment">
        <div class="form-group">
          <label for></label>
          <input
            v-model="newComment.body"
            type="text"
            name
            class="form-control"
            placeholder="Comment"
            aria-describedby="helpId"
          />
          <button type="submit" class="btn btn-primary">Add New Comment</button>
        </div>
      </form>
    </li>
  </div>
</template>

<script>
// NOTE add drag and drop to change lists
import Comment from "../components/Comment";
export default {
  props: ["taskProp"],
  data() {
    return {
      editing: false,
      task: {},
      checked: this.taskProp.completed,
      newComment: {},
      commentsShow: false
    };
  },
  mounted() {
    this.$store.dispatch("getComments", this.taskProp.id);
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.taskProp.id];
    },
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskProp);
    },
    editBody() {
      this.editing = true;
      this.task = this.taskProp;
    },
    editFinish() {
      this.$store.dispatch("editTask", this.task);
      this.editing = false;
    },
    toggleComplete() {
      this.$store.dispatch("editTask", {
        completed: this.checked,
        id: this.taskProp.id,
        listId: this.taskProp.listId,
      });
    },
    addComment() {
      this.newComment.taskId = this.taskProp.id;
      this.$store.dispatch("addComment", this.newComment);
      this.newComment = {};
    },
    moveItem() {
      //emit to parent first way
      // this.$emit("dragstart");

      //use events to set data for 2nd way
      event.dataTransfer.setData("data", JSON.stringify(this.taskProp));
      
    },
  },
  components: {
    Comment,
  },
};
</script>

<style scoped>
.checkbx {
  zoom: 1.5;
}
</style>