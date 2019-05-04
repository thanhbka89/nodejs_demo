<template>
  <div id="app">
    <div id="header-nav" class="nav-bars">
      <!-- <img src="./assets/logo.png"> -->
      <router-link :to="{ name: 'HelloWorld' }">Home</router-link>
      <router-link to="/contact">About</router-link>
      <router-link to="/listuser">|Get API Mock.io|</router-link>
      <router-link :to="{ name: 'API_NODE' }">|Get API local|</router-link>
      <router-link to="/user">Communication Component</router-link>
      <router-link to="/vuex">| VueX Demo |</router-link>
      <language-picker></language-picker>
      <p>{{ $t('greeting') }}</p>
      <hr>
    </div>
    <div class="content">
      <router-view/>
    </div>
    <div id="footer-nav" class="nav-bars">
      <hr>
      <br><br><br>
      FOOTER</div>
  </div>
</template>

<script>
import LanguagePicker from "@/components/LanguagePicker.vue";

export default {
  name: "App",
  methods: {},
  components: {
    LanguagePicker
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
