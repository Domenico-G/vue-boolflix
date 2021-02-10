new Vue({
  el: "#app",
  data: {
    listMovie: [],
    titleMovie: "",
  },
  methods: {
    getMovie: function () {
      const self = this;
      axios
        .all([
          axios.get(
            "https://api.themoviedb.org/3/search/movie?api_key=a125714ea457f065269757ad3c9d6db9&query=" +
              this.titleMovie
          ),
          axios.get(
            "https://api.themoviedb.org/3/search/tv?api_key=a125714ea457f065269757ad3c9d6db9&query=" +
              this.titleMovie
          ),
        ])
        .then(
          axios.spread(function (respM, respT) {
            console.log(respT.data.results[0].title);
            //creo una lista di film e serieTV tramite query
            self.listMovie = respM.data.results.concat(respT.data.results);
            self.listMovie.forEach((item) => {
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
  },
});
Vue.config.devtools = true;
