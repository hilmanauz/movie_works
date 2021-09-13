export const state = () => ({
  resMovies: [],
  lastPage: 0,
})

export const mutations = {
  SET_RES_MOVIES(state, payload) {state.resMovies = payload},
  SET_LAST_PAGE(state, payload) {state.lastPage = state.lastPage+1}
}

export const actions = {
  async apiMovies({state, commit}) {
    await commit('SET_LAST_PAGE')
    const {data} = await this.$axios.get(`/movie/now_playing?api_key=02dab1cfcd5492db4d3db083a5eb2062&language=en-US&page=${state.lastPage}`)
    const movies = [...state.resMovies]
    const {results} = data
    results.forEach(item => movies.push(item))
    commit('SET_RES_MOVIES', movies)
  }
}