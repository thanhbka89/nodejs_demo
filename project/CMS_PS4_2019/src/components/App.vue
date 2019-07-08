<template>
  <transition name="fade">
    <div id="app">  
      <router-view></router-view>  
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
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            debugger
            this.$store.dispatch('logout')
            .then(() => {
              this.$router.push('/login')
            })
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
