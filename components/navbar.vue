<template>
  <v-app-bar
    fixed
    color="teal lighten-3"
    hide-on-scroll
    app
  >
    <v-container>
      <v-img src="/movieworks-logo.png" lazy-src="/movieworks-logo.png" alt="logo" height="80" width="150" contain @click="goToHome" class="clickable"/>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>