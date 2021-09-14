<template>
  <v-hover v-slot="{ hover }" open-delay="300">
    <v-card :elevation="type === 'suggestion' ? 0 : ''" :class="type === 'suggestion' ? 'mx-2' : ''">
        <v-img
          :max-height="type === 'suggestion' ? '' : 400"
          :max-width="type === 'suggestion' ? 300 : ''"
          class="clickable"
          :lazy-src="`https://image.tmdb.org/t/p/w200${type === 'suggestion' ? item.backdrop_path : item.poster_path}`"
          :src="`https://image.tmdb.org/t/p/w300${type === 'suggestion' ? item.backdrop_path : item.poster_path}`"
          @click="goToDetails(item.id)"
        >
          <div v-if="type === 'list'">
            <v-img v-if="hover" style="transform: scale(1.05);" :src="`https://image.tmdb.org/t/p/w300${item.poster_path}`"/>
          </div>
          <v-slide-y-reverse-transition v-else-if="type ==='suggestion'">
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
      <div class="pa-3 d-flex flex-column" style="height:150px; position:relative" v-if="type === 'list'">
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
      <div v-else-if="type === 'suggestion'">
        <div class="d-flex justify-space-between clickable" @click.prevent="goToDetails(item.id)">
          <span class="text-body-1 font-weight-bold title-recommendation">{{item.title}}</span>
          <span class="text-body-1">{{Math.round(item.vote_average*10)}}%</span>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    type: String,
    item: {
      type: Object,
      default: {}
    },
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
      // // go to detail movie on new tab
      // if(this.type === 'list') {
      //   let routeData = this.$router.resolve({name: 'movie-id', params: { id }}); 
      //   window.open(routeData.href, '_blank');
      // } else {
      //   this.$router.push(`/movie/${id}`)
      // }

      // go to detail movie on the same page
      this.$router.push(`/movie/${id}`)
    },
    progressColor(data) {
      if(data > 50) return 'teal'
      else if (data >= 25 || data <= 50) return 'yellow'
      else if (data < 25) return 'red'
    },
  }

}
</script>

<style>
.title-recommendation {
  width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}
</style>