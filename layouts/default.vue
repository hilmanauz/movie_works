<template>
  <v-app>
    <Navbar/>
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {

}
</script>

<style lang="scss">
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