new Vue({
  el: "#app",
  data: {
    listaCast: [],
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
          axios.spread((respMovie, respTv) => {
            //creo una lista di film e serieTV tramite query
            this.listMovie = respMovie.data.results.concat(respTv.data.results);
            this.voteInteger();
          })
        );
    },

    // funzione per cambiare il voto dei film da decimale in intero
    voteInteger: function () {
      this.listMovie.forEach((item) => {
        item.vote_average = Math.ceil(item.vote_average / 2);
      });
    },

    // funzione per stelle vuote in base al voto
    emptyStars: function (stars) {
      return 5 - stars;
    },
    // funzione per creare url dei poster
    getPoster: function (url) {
      return `background-image:url('https://image.tmdb.org/t/p/original${url}')`;
    },

    // funzione per cercare gli attori del film
    async getCast(el) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${el.id}/credits?api_key=a125714ea457f065269757ad3c9d6db9`
        )
        .then(function (credits) {
          console.log(credits);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
Vue.config.devtools = true;
