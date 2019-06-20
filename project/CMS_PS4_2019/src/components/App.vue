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
    methods: {
      // logout () {
      //   this.$store.commit('SET_USER', null)
      //   this.$store.commit('SET_TOKEN', null)

      //   if (window.localStorage) {
      //     window.localStorage.setItem('user', null)
      //     window.localStorage.setItem('token', null)
      //   }

      //   this.$router.push('/login')
      // }
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
