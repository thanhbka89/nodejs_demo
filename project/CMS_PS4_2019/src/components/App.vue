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
      debugger
      this.$http.interceptors.response.use(undefined, function (err) {
        console.log('bbb', err.status)
        return new Promise((resolve, reject) => {
          console.log('vvv', err.status)
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch('logout')
            .then(() => {
              this.$router.push('/login')
            })
          }
          throw err
        })
      })
      // Add a response interceptor
      // this.$http.interceptors.response.use(function (response) {
      //   console.log('BBBBB', response)
      //   return response
      // }, function (error) {
      //   console.log('CCCCC', error)
      //   return Promise.reject(error)
      // })
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
