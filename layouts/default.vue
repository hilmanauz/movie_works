<template>
  <v-app>
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
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
.clickable {
  cursor: pointer;
}
.v-application {
  font-family: 'Source Sans Pro', Arial, sans-serif !important;
}
</style>