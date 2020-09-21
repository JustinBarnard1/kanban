<template>
    <div class="col-4">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{listProp.title}}</h4>
        <i @click="deleteList">Delete List</i>
      </div>
    </div>
    </div>
</template>

<script>

export default {
props: ["listProp"],
methods: {
  deleteList(){
    this.$store.dispatch('deleteList', this.listProp.id)
  }
}
}

</script>

<style>

</style>