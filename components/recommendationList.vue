<template>
  <div class="mt-6">
    <span class="text-h5 font-weight-bold">&emsp; &ensp; Recommendations</span>
    <v-slide-group show-arrows class="mt-2" center-active>
      <v-slide-item
        v-for="(item, index) in recommendations"
        :key="(index)"    
        v-slot="{ toggle }"        
      >
      <MovieCard :item="item" type="suggestion" @click.native="toggle" />
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
export default {
  props: {
    recommendations: {
      type: [Array, Object],
      default: []
    },
  }
}
</script>

<style>

</style>