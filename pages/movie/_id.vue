<template>
<div>
  <MovieDetailContent :data="data" :videos="videos" />
  <RecommendationList :recommendations="recommendations" />
</div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.data.title}`
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