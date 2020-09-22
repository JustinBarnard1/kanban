<template>
    <div class="">
        <li class="card">
          <input @change="toggleComplete" v-model="checked" type="checkbox" name="" id="" autocomplete="off"><p v-if="!editing" @click="editBody" >{{taskProp.body}}</p>
        <form  @submit.prevent="editFinish" v-if="editing" class="form-inline">
          <div class="form-group">
            <input  v-model="task.body" type="text" name="" class="form-control" placeholder="" aria-describedby="helpId">
          </div>
        <button  type="submit" class="btn btn-success">Done</button>
        </form>
        <small><i @click="deleteTask">Delete Task</i></small>
        <comment v-for="comment in comments" :key="comment.id" :commentProp="comment"/>
                <form class="form-inline" @submit.prevent="addComment">
          <div class="form-group">
            <label for=""></label>
            <input v-model="newComment.body" type="text" name="" class="form-control" placeholder="Task" aria-describedby="helpId">
            <button type="submit" class="btn btn-primary">Add New Comment</button>
          </div>
        </form>
        </li>
    </div>  
</template>

<script>
import Comment from '../components/Comment'
export default {
props: ["taskProp"],
data(){
  return {
    editing: false,
    task: {},
    checked: this.taskProp.completed,
    newComment: {}
  }
},
mounted(){
  this.$store.dispatch("getComments", this.taskProp.id);
},
computed:{
  comments(){
    return this.$store.state.comments[this.taskProp.id]
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
  },
    addComment(){
    this.newComment.taskId = this.taskProp.id
    this.$store.dispatch('addComment', this.newComment)
  },
},
components: {
  Comment
}
}

</script>

<style>

</style>