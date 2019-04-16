<template>
  <div class="hello">
    <h2>Get API Node Local</h2>
    <h4>{{ msg }}</h4>
    <router-link to="/contact">Contact</router-link>
    <router-link to="/news">News</router-link>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  created: function() {
    this.get_home();
  },
  methods: {
    get_home() {
      this.axios
        .get("http://localhost:8989")
        .then(response => {
          if (response.data) {
            this.msg = response.data.message;
          }
        })
        .catch(error => {
          this.msg = error;
          console.log(error.config);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>