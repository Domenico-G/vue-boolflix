new Vue({
  el: "#app",
  data: {
    listGenre: [],
    listaCast: [],
    listMovie: [],
    titleMovie: "",
  },
  mounted() {
    axios
      .all([
        axios.get("https://api.themoviedb.org/3/genre/movie/list", {
          params: {
            api_key: "a125714ea457f065269757ad3c9d6db9",
          },
        }),
        axios.get("https://api.themoviedb.org/3/genre/tv/list", {
          params: {
            api_key: "a125714ea457f065269757ad3c9d6db9",
          },
        }),
      ])
      .then(
        axios.spread((respMovie, respTv) => {
          //creo una lista dei generi di film e serieTV
          this.listGenre = respTv.data.genres;
          respMovie.data.genres.forEach((el) => {
            let flag = true;
            for (let i = 0; i < this.listGenre.length; i++) {
              if (el.id === this.listGenre[i].id) {
                this.flag = false;
              }
            }
            if (flag) {
              this.listGenre.push(el);
            }
          });
        })
      );
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

    // funzione per mostrare gli attori del film
    getCast: function (el) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${el}/credits?api_key=a125714ea457f065269757ad3c9d6db9`
        )
        .then((credits) => {
          this.listaCast = [];
          for (let i = 0; i < 5; i++) {
            this.listaCast.push(credits.data.cast[i].name);
          }
        });
    },
    // funzione per cercare gli attori del film
    getGenre: function (genre) {
      const arr = [];
      this.listGenre.forEach((el) => {
        for (let i = 0; i < genre.length; i++) {
          if (genre[i] === el.id) arr.push(el.name);
        }
      });
      return arr;
    },
  },
});
Vue.config.devtools = true;
