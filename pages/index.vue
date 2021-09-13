<template>
<div class="text-center">
  <v-row>
    <v-col v-for="(item, index) in results" :key="index" cols="3">
      <v-hover v-slot="{ hover }" open-delay="300">
        <v-card>
            <v-img
              max-height="400"
              class="clickable"
              :lazy-src="`https://image.tmdb.org/t/p/w200${item.poster_path}`"
              :src="`https://image.tmdb.org/t/p/w300${item.poster_path}`"
              @click="goToDetails(item.id)"
            >
            <div>
              <v-img v-if="hover" style="transform: scale(1.05);" :src="`https://image.tmdb.org/t/p/w300${item.poster_path}`"/>
            </div>
            </v-img>
          <div class="pa-3 d-flex flex-column" style="height:150px; position:relative">
            <v-progress-circular
              :rotate="-90"
              :size="50"
              :value="(item.vote_average * 10)"
              :color="progressColor(item.vote_average * 10)"
              :class="hover ? 'd-none' : ''"
              class="review-circular"
            >
              <span class="text-body-2 progress-caption font-weight-bold">{{ item.vote_average * 10 }}<sup>%</sup></span>
            </v-progress-circular>
            <div class="mt-1">
              <v-icon dense>mdi-account-voice</v-icon>
              <span class="text-body-2 align-middle">{{item.original_language.toUpperCase()}}</span>
            </div>
            <span class="font-weight-bold clickable mt-1 title-poster" @click="goToDetails(item.id)">{{item.title}}</span>
            <span class="text-body-2 mt-1" style="color: grey">{{dateToString(item.release_date)}}</span>
          </div>
        </v-card>
      </v-hover>
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
    dateToString(data) {
      let monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "dec"]
      let fullDate = new Date(data)
      let month = monthShortNames[fullDate.getMonth()]
      let date = fullDate.getDate()
      let year = fullDate.getFullYear()
      let dateUX = `${month} ${date}, ${year}`
      
      return `${dateUX}`
    },
    goToDetails(id) {
      this.$router.push(`/movie/${id}`)
    },
    progressColor(data) {
      if(data > 50) return 'teal'
      else if (data >= 25 || data <= 50) return 'yellow'
      else if (data < 25) return 'red'
    },
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
