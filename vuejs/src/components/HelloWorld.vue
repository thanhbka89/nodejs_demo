<template>
  <div class="hello">
    <language-picker></language-picker>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">Core Docs</a>
      </li>
      <li>
        <router-link to="/contact">Contact</router-link>
      </li>
      <li>
        <router-link to="/news">News</router-link>
      </li>
    </ul>
    <h2>Form</h2>
    <ul>
      <li>
        <router-link to="/form">Form</router-link>
      </li>
      <li>
        <router-link to="/user">FormUser</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import languagePicker from './languagePicker.vue';

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {
    // set data to localStorage
    localStorage.setItem('username', 'thanhnm');
    console.log('Set item in localStorage!');
    
  },
  component: {
    languagePicker
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
