<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'home' }">Home</router-link> | 
      <router-link to="/hello">Hello</router-link> | 
      <router-link to="/coin/bitcoin">Bitcoin</router-link>
    </nav>
    <h3>Heathcheck {{ ip }}</h3>
    <p>
      Connect API: {{ api_status }}
    </p>
    <p>
      Connect DB: {{ db_status }}
    </p>
    <hr />
    
    <router-view :key="$route.fullPath" />

  </div>
</template>

<script>
import { G_API } from '@/api'
import Common from '@/services/Common'

export default {
  name: 'app',
  data() {
    return {
      api_status: '',
      db_status: '',
      ip: ''
    }
  },
  async created() {
    await Promise.all([
      this.getIP(),
      this.checkAPI(),
      this.checkDB()
    ])
  },
  methods: {
    async getIP() {
      try {
        let res = await G_API.get('https://api.ipify.org/?format=json')
        this.ip = res.data.ip
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    },
    async checkAPI() {
      try {
        let res = await Common.checkConnectApi()
        this.api_status = res.statusText
      } catch (e) {
        this.api_status = e
      }
    },
    async checkDB() {    
      try {
        let res = await Common.checkConnectDb()
        this.db_status = res.statusText
      } catch (e) {
        this.db_status = e
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
