<template>
<div class="text-center">
  <v-row>
    <v-col v-for="(item, index) in results" :key="index" cols="3">
      <MovieCard :item="item" type="list" />
      <span
        v-intersect.quiet="() => onIntersect()"
        v-if="index === temp && index != 0"
      ></span>
    </v-col>
  </v-row>
  <br/>
  <v-progress-circular
    :size="70"
    v-show="isLoading"
    :width="7"
    color="teal"
    indeterminate
    class="loading"
  ></v-progress-circular>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  head() {
    return {
      title: 'Home'
    }
  },
  data () {
    return {
      temp : 16,
      isLoading : false,
    }
  },
  async asyncData({store}) {
    if (store.state.lastPage === 0) {
      await store.dispatch('apiMovies')
      const results = store.state.resMovies
      return {results}
    } 
  },
  computed: {
    ...mapState([
      'resMovies'
    ])
  },
  methods: {
    async onIntersect() {
      this.isLoading = true
      this.temp += 16
      await this.$store.dispatch('apiMovies')
      this.results = this.resMovies
      this.isLoading = false
    },
  }
}
</script>

<style lang=scss>

.review-circular {
  position: absolute;
  transition: transform .5s;
  top: -27px;
  right: 10px;
}

.loading {
  circle {
    fill: transparent;
  }
}

circle {
  fill: black;
}

.progress-caption {
  color: white;
  z-index: 1;
}

.title-poster {
  font-size: 18px;
}

.title-poster:hover {
  color: rgb(0, 158, 158);
}

.align-middle {
  vertical-align: bottom;
}

.v-responsive {
  overflow: unset !important;
}

</style>
