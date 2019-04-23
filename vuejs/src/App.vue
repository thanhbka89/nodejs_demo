<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-link :to="{ name: 'HelloWorld' }">Home</router-link>
    <router-link to="/contact">About</router-link>
    <router-link to="/listuser">|Get API Mock.io|</router-link>
    <router-link :to="{ name: 'API_NODE' }">|Get API local|</router-link>
    <router-link to="/user">Communication Component</router-link>
    <router-link to="/vuex">| VueX Demo |</router-link>
    <p>{{ $t("common.select_lang") }}</p>
    <p>{{ $t('greeting') }}</p>
    <h3>without Vuex</h3>
    <button @click="switchLang('en')">EN</button>
    <button @click="switchLang('vn')">VI</button>
    <br>

    <router-view/>

  </div>
</template>

<script>
// import i18n from "./lang/i18n";

export default {
  name: "App",
  methods: {
    // switchLang: lang => {
    //   if (lang in vue.$i18n.messages) {
    //     console.log("no ajax");
    //     this.$i18n.locale = lang;
    //   } else {
    //     this.loadLocaleMessage(lang, (err, message) => {
    //       if (err) {
    //         console.error(err);
    //         return;
    //       }
    //       i18n.setLocaleMessage(lang, message);
    //       this.$i18n.locale = lang;
    //     });
    //   }
    // }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
