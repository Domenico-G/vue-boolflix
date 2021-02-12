new Vue({
  el: "#app",
  data: {
    listMovie: [],
    titleMovie: "",
  },
  methods: {
    getMovie: function () {
      axios
        .all([
          axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
              api_key: "a125714ea457f065269757ad3c9d6db9",
              query: this.titleMovie,
            },
          }),
          axios.get("https://api.themoviedb.org/3/search/tv", {
            params: {
              api_key: "a125714ea457f065269757ad3c9d6db9",
              query: this.titleMovie,
            },
          }),
        ])
        .then(
          axios.spread((respM, respT) => {
            //creo una lista di film e serieTV tramite query
            this.listMovie = respM.data.results.concat(respT.data.results);
            this.listMovie.forEach((item) => {
              //cambio il voto dei film da decimale in intero
              item.vote_average = Math.ceil(item.vote_average / 2);
            });
          })
        );
    },
    // funzione per stelle vuote
    emptyStars: function (stars) {
      return 5 - stars;
    },
    // funzione per creare url dei poster
    getPoster: function (url) {
      return `background-image:url('https://image.tmdb.org/t/p/w342${url}')`;
    },
  },
});
Vue.config.devtools = true;
