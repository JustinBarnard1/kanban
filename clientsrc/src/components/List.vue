<template>
    <div class="col-4">
    <div class="card">
      <div class="card-body">
        <h4 v-if="!editing" class="card-title" @click="editTitle">{{listProp.title}}</h4>
        <form  @submit.prevent="editFinish" v-else class="form-inline">
          <div class="form-group">
            <input v-model="list.title" type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
          </div>
        <button  type="submit" class="btn btn-success">Done</button>
        </form>
        <i @click="deleteList">Delete List</i>
      </div>
    </div>
    </div>
</template>

<script>

export default {
props: ["listProp"],
data(){
  return {
    editing: false,
    list: {}
  }
},
methods: {
  deleteList(){
    this.$store.dispatch('deleteList', this.listProp.id)
  },
  editTitle(){
    this.editing = true
    this.list = this.listProp
  },
  editFinish(){
    this.$store.dispatch('editList', this.list)
    this.editing = false
  }
},

}

</script>

<style>

</style>