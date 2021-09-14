<template>
  <div>

    <!-- backdrop content -->
    <div v-bind:style="{ backgroundImage: 'url(' + `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path}`+ ')' }" class="backdrop-image">
    </div>

    <!-- Show all data of the movie detail -->
    <div class="content">
      <v-container class="d-flex" style="height: 100%">
        <img
          style="max-height: 400px"
          class="my-auto"
          :src="`https://image.tmdb.org/t/p/original${data.poster_path}`"
        />
        <div class="d-flex flex-column align-content-center justify-center ml-5">
          <span class="text-h4 font-weight-bold">{{data.title}} 
            <span class="text-h4" style="color: gray">({{new Date(data.release_date).getFullYear()}})
            </span>
          </span>
          <span class="text-h6">{{new Date(data.release_date).toLocaleString('id').split(' ')[0]}} ({{data.production_countries[0].iso_3166_1}}) 
            · <span v-for="(item, index) in data.genres" :key="index">{{item.name}}{{index === data.genres.length-1 ? '' : ', '}}</span> 
            · {{convertDuration(data.runtime)}} 
          </span>
          <div class="mt-3 d-flex align-center justify-space-between
          " style="width: 250px">
            <div class="d-flex flex-column align-center">
              <v-progress-circular
                :rotate="-90"
                :size="50"
                :value="(data.vote_average * 10)"
                :color="progressColor(data.vote_average * 10)"
              >
                <span class="text-body-2 progress-caption font-weight-bold">{{ data.vote_average * 10 }}<sup>%</sup></span>
              </v-progress-circular>
              <span class="text-body-2 font-weight-bold">User Score</span>
            </div>
            <v-chip 
              label 
              link 
              color="teal" 
              class="chip-trailer" 
              @click.stop="dialog = true"
            >
              <v-icon class="icon-trailer">mdi-play</v-icon>
              <span class="text-body-2 font-weight-bold mx-2 text-trailer">Play Trailer</span>
            </v-chip>
          </div>
          <span class="text-body-1 mt-3 font-italic font-weight-medium" style="color: lightgray">{{data.tagline}}</span>
          <div class="d-flex justify-space-between" style="width: 300px">
            <div class="d-flex flex-column">
              <span class="mt-2 text-body-1 font-weight-bold">Status</span>
              <span class="text-body-2">{{data.status}}</span>
            </div>
            <div class="d-flex flex-column">
              <span class="mt-2 text-body-1 font-weight-bold">Original Language</span>
              <span class="text-body-2">{{data.spoken_languages[0].english_name}}</span>
            </div>
          </div>
          <span class="mt-2 text-body-1 font-weight-bold">Overview</span>
          <span class="text-body-2">{{data.overview}}</span>
          <div class="d-flex justify-space-between" style="width: 300px">
            <div class="d-flex flex-column">
              <span class="mt-2 text-body-1 font-weight-bold">Budget</span>
              <span class="text-body-2">{{formatToCurrency(data.budget)}}</span>
            </div>
            <div class="d-flex flex-column">
              <span class="mt-2 text-body-1 font-weight-bold">Revenue</span>
              <span class="text-body-2">{{formatToCurrency(data.revenue)}}</span>
            </div>
          </div>
        </div>
      </v-container>
    </div>

    <!-- Modals to show some of trailer videos -->
    <v-scale-transition>
      <v-dialog v-model="dialog" max-width="1124">
        <v-carousel height="auto"
          hide-delimiters
          :continuous="false"
          @change="goToNextVideo"
          v-click-outside="goToNextVideo"
          v-if="videos.length"
        >
          <v-carousel-item 
            v-for="(item, i) in videos"
            :key="i"
          >
            <v-card class=" pa-3 d-flex flex-column align-center" style="background-color: black; color: white;">
              <span class="text-h5 align-self-start">Play Trailer</span>
              <iframe :id="`videoIframe-${i}`" v-if="item.site === 'YouTube'" width="1000" height="600" :src="`https://www.youtube.com/embed/${item.key}?controls=0&autoplay=1&enablejsapi=1`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </v-card>
          </v-carousel-item>
        </v-carousel>	
        <v-card v-else 
          width="1200" 
          height="600" 
          color="black" 
          class="d-flex flex-column justify-center align-center" 
          style="color: white;"
        >
          <span class="text-h2">Sorry,</span>
          <span class="text-h3">Trailer Video is not Available</span>
        </v-card>
      </v-dialog>
    </v-scale-transition>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    videos: {
      type: [Array, Object],
      default: []
    },
  },
  data() {
    return {
      dialog: false,
      indexTemp: 0,
    }
  },
  methods : {
    convertDuration(time) {
      let hour = Math.floor(time / 60)
      time = time % 60
      return `${hour}h ${time}m`
    },
    progressColor(data) {
      if(data > 50) return 'teal'
      else if (data >= 25 || data <= 50) return 'yellow'
      else if (data < 25) return 'red'
    },
    formatToCurrency(amount) {
      return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },
    goToNextVideo() {
      this.$nextTick(() => {
        let ysrc = document.querySelectorAll('[id^="videoIframe-"]');
        ysrc.forEach((item, index) => {
          if(this.indexTemp > 0){
            let newsrc = item.src.replace("&autoplay=1", "");
            document.getElementById(`videoIframe-${index}`).src = newsrc;
          }
        })
        this.indexTemp++
      })
    }
  }
}
</script>

<style>

</style>