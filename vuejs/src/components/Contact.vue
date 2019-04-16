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
  }
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