<template>
<div>
  <div v-bind:style="{ backgroundImage: 'url(' + `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path}`+ ')' }" class="backdrop-image">
  </div>
  <div class="content">
    <v-container class="d-flex" style="height: 100%">
      <img
        style="max-height: 400px"
        class="my-auto"
        :src="`https://image.tmdb.org/t/p/original${data.poster_path}`"
      />
      <div class="d-flex flex-column align-content-center justify-center ml-5">
        <span class="text-h4 font-weight-bold">{{data.title}} <span class="text-h4" style="color: gray">({{new Date(data.release_date).getFullYear()}})</span></span>
        <span class="text-h6">{{new Date(data.release_date).toLocaleString('id').split(' ')[0]}} ({{data.production_countries[0].iso_3166_1}}) · <span v-for="(item, index) in data.genres" :key="index">{{item.name}}{{index === data.genres.length-1 ? '' : ', '}}</span> · {{convertDuration(data.runtime)}} </span>
        <div class="mt-4 d-flex align-center justify-space-between
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
          <v-chip label link color="teal" class="chip-trailer" @click.stop="dialog = true"><v-icon class="icon-trailer">mdi-play</v-icon><span class="text-body-2 font-weight-bold mx-2 text-trailer">Play Trailer</span></v-chip>
        </div>
        <span class="text-body-1 mt-4 font-italic font-weight-medium" style="color: lightgray">{{data.tagline}}</span>
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
  <div class="mt-6">
    <span class="text-h5 font-weight-bold">&emsp; &ensp; Recommendations</span>
    <v-slide-group show-arrows class="mt-2" center-active>
      <v-slide-item
        v-for="(item, index) in recommendations"
        :key="(index)"    
        v-slot="{ toggle }"        
      >
      <v-hover v-slot="{ hover }">
        <v-card elevation="0" class="mx-2">
          <v-img max-width="300" contain :lazy-src="`https://image.tmdb.org/t/p/w200${item.backdrop_path}`" :src="`https://image.tmdb.org/t/p/w500${item.backdrop_path}`" style="border-radius: 5px;" @click="toggle" @click.prevent="goToDetails(item.id)" class="clickable">
            <v-slide-y-reverse-transition>
              <div class="card-hover-info" v-if="hover" open-delay="100">
                  <v-card tile elevation="0" height="35" width="100%" style="background: rgba(255,255,255,0.8);">
                    <div class="d-flex justify-space-between px-2 my-1">
                      <span class="text-body-1"><v-icon small>mdi-calendar-range</v-icon> {{new Date(item.release_date).toLocaleString('id').split(' ')[0]}}</span>
                      <span class="text-body-1"><v-icon small>mdi-account-voice</v-icon> {{item.original_language.toUpperCase()}}</span>
                    </div>
                  </v-card>
              </div>
            </v-slide-y-reverse-transition>
          </v-img>
          <div class="d-flex justify-space-between clickable" @click="toggle" @click.prevent="goToDetails(item.id)">
            <span class="text-body-1 font-weight-bold title-recommendation">{{item.title}}</span>
            <span class="text-body-1">{{Math.round(item.vote_average*10)}}%</span>
          </div>
        </v-card>
      </v-hover>
      </v-slide-item>
    </v-slide-group>
  </div>
   <v-scale-transition>
      <v-dialog v-model="dialog" max-width="1124">
        <v-carousel height="auto"
          hide-delimiters
          :continuous="false"
          @change="goToNextVideo"
          v-click-outside="goToNextVideo"
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
      </v-dialog>
    </v-scale-transition>
</div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.data.title}`
    }
  },
  data() {
    return {
      dialog: false,
      indexTemp: 0,
    }
  },
  async asyncData({$axios, route}) {
    const {data} = await $axios.get(`/movie/${route.params.id}?api_key=02dab1cfcd5492db4d3db083a5eb2062&language=en-US`)
    let recommendations = await $axios.get(`/movie/${route.params.id}/similar?api_key=02dab1cfcd5492db4d3db083a5eb2062&language=en-US`)
    let videos = await $axios.get(`/movie/${route.params.id}/videos?api_key=02dab1cfcd5492db4d3db083a5eb2062&language=en-US`)
    videos = videos.data.results
    recommendations = recommendations.data.results
    return {data, recommendations, videos }
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
    goToDetails(id) {
      this.$router.push(`/movie/${id}`)
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

<style lang=scss>
.icon-trailer, .text-trailer {
  color: white !important;
  font-size: 25px !important;
}

.text-trailer {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
}

.backdrop-image {
  margin: -12px;
  margin-left: calc( (-100vw + 100%)/2 );
  width: 100vw;  
  height: 450px;
  background-repeat: no-repeat;
  background-size: cover;
}

.card-hover-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.title-recommendation {
  width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}

.progress-caption {
  color: white;
  z-index: 1;
}

.content {
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0, 0.7); 
  color: white;
  position: absolute;
  top: 31%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 100%;
  height: 450px;
  margin: 0;
}
</style>