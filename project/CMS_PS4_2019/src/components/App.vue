<template>
  <transition name="fade">
    <div id="app">  
      <router-view :key="$route.fullPath"></router-view>  
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        section: 'Head'
      }
    },
    created() {
      // Handling Expired Token Cases
      // Add a response interceptor
      this.$http.interceptors.response.use(undefined, err => {
        return new Promise((resolve, reject) => {
          if (err.response && err.response.status === 401 &&
          err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch('logout')
            .then(() => {
              this.$router.push('/login')
            })
          }
          if (!err.response) { // ko ket noi dc Server
            this.$store.commit('TOGGLE_NETWORK')
            this.$router.push('/')
          }
          throw err
        })
      })
    },
    methods: {
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
