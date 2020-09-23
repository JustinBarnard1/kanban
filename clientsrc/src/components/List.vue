<template>
  <div class="col-4 d-flex justify-content-center" @dragover.prevent @drop.prevent="moveTask()">
    <div class="row">
      <div id="listCard" class="card bg-secondary">
        <div class="card-body">
          <h4 v-if="!editing" class="card-title text-light" @click="editTitle">{{listProp.title}}</h4>
          <form @submit.prevent="editFinish" v-else class="form-inline">
            <div class="form-group">
              <input
                v-model="list.title"
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
          <i class="text-light" @click="deleteList">Delete List</i>
          <ul>
            <task draggable="true" v-for="task in tasks" :key="task.id" :taskProp="task" />
          </ul>
          <form class="form-inline" @submit.prevent="addTask">
            <div class="form-group mb-2">
              <label for></label>
              <input
                v-model="newTask.body"
                type="text"
                name
                id
                class="form-control"
                placeholder="Task"
                aria-describedby="helpId"
              />
              <button type="submit" class="btn btn-primary">Add New Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "../components/Task";
export default {
  props: ["listProp"],
  data() {
    return {
      editing: false,
      list: {},
      newTask: {},
    };
  },
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listProp.id);
    },
    editTitle() {
      this.editing = true;
      this.list = this.listProp;
    },
    editFinish() {
      this.$store.dispatch("editList", this.list);
      this.editing = false;
    },
    addTask() {
      this.newTask.listId = this.listProp.id;
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = {};
    },
    moveTask() {
      let task = JSON.parse(event.dataTransfer.getData("data"));
      let moveData = {
        // oldListId: event.dataTransfer.getData("list"),
        task,
        newListId: this.listProp.id,
      };
      // console.log(moveData);
      this.$store.dispatch("moveTask", moveData);
    },
  },
  mounted() {
    this.$store.dispatch("getTasks", this.listProp.id);
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listProp.id];
    },
  },
  components: {
    Task,
  },
};
</script>

<style scoped>
#listCard {
  max-height: 60vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

ul {
  list-style: none;
}
</style>