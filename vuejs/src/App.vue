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
      <router-link to="/dashboard">DashBoard</router-link>
      <language-picker></language-picker>
      <p>{{ $t('greeting') }}</p>
      <hr>
      <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
    </div>
    <div class="content">
      <router-view/>
    </div>
    <div id="footer-nav" class="nav-bars">
      <hr>
      <br>
      <br>
      <br>FOOTER
    </div>
  </div>
</template>

<script>
import LanguagePicker from "@/components/LanguagePicker.vue";

export default {
  name: "App",
  methods: {},
  computed: {
    alert() {console.log('SSSSS', this)
      return this.$store.state.alert;
    }
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.$store.dispatch("alert/clear");
    }
  },
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
