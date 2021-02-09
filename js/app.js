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
        .get(
          "https://api.themoviedb.org/3/search/movie?api_key=a125714ea457f065269757ad3c9d6db9&query=" +
            this.titleMovie
        )
        .then(function (resp) {
          self.listMovie = resp.data.results;
        });
    },
  },
});
Vue.config.devtools = true;
