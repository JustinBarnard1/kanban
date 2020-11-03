<template>
  <div id="homePg" class="home bg-home text-light container-fluid">
    <div class="d-none d-md-block">
    <h1>
      <u>Welcome To The Board!</u>
    </h1>
    <h4 class="mt-3">Here you can create/organize</h4>
    <h4>your tasks/responsibilities</h4>
    <h4>into boards/repositories</h4>
    <h4 v-if="!$auth.isAuthenticated">Please provide authorization/login to continue.</h4>
    <h4 v-if="$auth.isAuthenticated">You may proceed/continue.</h4>
    <div class="row">
      <router-link
        v-if="$auth.isAuthenticated"
        style="font-size: 32px"
        class="offset-5 col-2 d-flex justify-content-center nav-link text-info"
        :to="{ name: 'boards' }"
      >Get Started</router-link>
    </div>
    </div>
    <div class="d-block d-md-none">
      <h1 class="text-dark">Mobile version coming soon!</h1>
    </div>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
};
</script>


<style scoped>
#homePg {
  flex-grow: 1;
}
.bg-home {
  background-image: url("https://preview.redd.it/ws1q2v359xl31.png?auto=webp&s=96280224f17eca28d6b7a10ba1a3f352584b364f");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>