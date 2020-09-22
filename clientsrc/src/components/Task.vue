<template>
    <div class="">
        <li>
        <p v-if="!editing" >{{taskProp.body}}</p>
        <form  @submit.prevent="editFinish" v-else class="form-inline">
          <div class="form-group">
            <input v-model="task.title" type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
          </div>
        <button  type="submit" class="btn btn-success">Done</button>
        </form>
        <i @click="deleteTask">Delete Task</i>
        </li>
    </div>
</template>

<script>
// @click="editBody"
export default {
props: ["taskProp"],
data(){
  return {
    editing: false,
    task: {}
  }
},
methods: {
  deleteTask(){
    this.$store.dispatch('deleteTask', this.taskProp.id)
  },
  editTitle(){
    this.editing = true
    this.task = this.taskProp
  },
  editFinish(){
    this.$store.dispatch('editTask', this.task)
    this.editing = false
  }
},

}

</script>

<style>

</style>