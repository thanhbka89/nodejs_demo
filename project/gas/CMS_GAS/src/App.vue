/* eslint-disable no-console */
<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'home' }">Home</router-link> | 
      <router-link to="/hello">Hello</router-link> | 
      <router-link to="/coin/bitcoin">Bitcoin</router-link>
    </nav>
    
    <router-view />

  </div>
</template>

<script>
import { G_API } from '@/api'

export default {
  name: 'app',
  created() {
    this.getIP()
  },
  methods: {
    async getIP() {
      try {
        let res = await G_API.get('https://api.ipify.org/?format=json')
        // eslint-disable-next-line no-console
        console.log(res)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
