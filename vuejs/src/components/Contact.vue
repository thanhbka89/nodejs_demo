<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Contact page</h2>
    <router-link to="/contact">Contact</router-link>
    <router-link to="/news">News</router-link>
    <h2>
      {{ message }}
    </h2>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message: 'See again',
    }
  },
  created() {
    // get data from localStorage
    let ls_name = localStorage.getItem('username')
    console.log(ls_name);
    debugger  // debug on browser
    if(ls_name) {
      this.message = ls_name
    }
  },
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>