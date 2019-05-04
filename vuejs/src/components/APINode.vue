<template>
  <div class="hello">
    <h2>Get API Node Local</h2>
    <h4>{{ msg }}</h4>
    <router-link to="/contact">Contact</router-link>
    <router-link to="/news">News</router-link>
    <h4>Get data mysql using node express API</h4>
    <div v-for="user in users">
      <p>
        <span>
          <b>{{ user.title }}</b>
        </span>
        <span>  ||  {{ user.desc }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      users: []
    };
  },
  created: function() {
    this.get_home();
  },
  mounted() {
    this.getPosts();
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
    },
    async getPosts() {
      try { 
        const response = await UserService.fetchUsers();
        this.users = response.data.data;
        console.log('ASYNC Axios', response);
      }catch (e) {
        console.log(e);       
      }
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
