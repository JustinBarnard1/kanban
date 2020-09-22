<template>
    <div class="">
        <li class="card">
          <input @change="toggleComplete" v-model="checked" type="checkbox" name="" id="" autocomplete="off"><p v-if="!editing" @click="editBody" >{{taskProp.body}}</p>
        <form  @submit.prevent="editFinish" v-if="editing" class="form-inline">
          <div class="form-group">
            <input  v-model="task.body" type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
          </div>
        <button  type="submit" class="btn btn-success">Done</button>
        </form>
        <small><i @click="deleteTask">Delete Task</i></small>
        </li>
    </div>  
</template>

<script>
 
export default {
props: ["taskProp"],
data(){
  return {
    editing: false,
    task: {},
    checked: this.taskProp.completed
  }
},
methods: {
  deleteTask(){
    this.$store.dispatch('deleteTask', this.taskProp)
  },
  editBody(){
    this.editing = true
    this.task = this.taskProp
  },
  editFinish(){
    this.$store.dispatch('editTask', this.task)
    this.editing = false
  },
  toggleComplete(){
    this.$store.dispatch("editTask",{completed: this.checked, id: this.taskProp.id, listId: this.taskProp.listId})
  }
},

}

</script>

<style>

</style>