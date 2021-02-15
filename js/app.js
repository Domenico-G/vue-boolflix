new Vue({
  el: "#app",
  data: {
    listTrending: [],
    listAllGenre: [],
    listaCast: [],
    listMovie: [],
    titleMovie: "",
    indexAndList: null,
    searchFlag: true,
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
        axios.get("https://api.themoviedb.org/3/trending/all/week", {
          params: {
            api_key: "a125714ea457f065269757ad3c9d6db9",
          },
        }),
      ])
      .then(
        axios.spread((respMovie, respTv, trendingMedia) => {
          // creo una lista dei media più popolari
          this.listTrending = trendingMedia.data.results;
          // cambio il voto del film da decimale in intero
          this.voteInteger(this.listTrending);
          this.indexAndList = trendingMedia.data.results[0];
          //creo una lista dei generi di film e serieTV
          this.listAllGenre = respTv.data.genres;
          respMovie.data.genres.forEach((el) => {
            let flag = true;
            for (let i = 0; i < this.listAllGenre.length; i++) {
              if (el.id === this.listAllGenre[i].id) {
                flag = false;
              }
            }
            if (flag) {
              this.listAllGenre.push(el);
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
            this.voteInteger(this.listMovie);
          })
        );
    },

    // funzione per cambiare il voto dei film da decimale in intero
    voteInteger: function (list) {
      list.forEach((item) => {
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
      this.listAllGenre.forEach((el) => {
        for (let i = 0; i < genre.length; i++) {
          if (genre[i] === el.id) {
            arr.push(el.name);
          }
        }
      });
      return arr;
    },
    // funzione per selezionare informazione di un media
    getIndex: function (index, list) {
      this.indexAndList = list[index];
    },
  },
});
Vue.config.devtools = true;
