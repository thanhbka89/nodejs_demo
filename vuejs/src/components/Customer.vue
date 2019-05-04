<template>
  <div class="customer">
    <h1>I'm a customer</h1>
    <p>I see {{ totalTvCount }} {{ getTotal }} TVs!</p>
    <button @click="removeTV"> RemoveTV </button>
    <button @click="setTV"> SET TV </button>
    <div>
      <p>IsLogged: {{ isLoggedIn }} </p>
      <button @click="login"> Login </button>
      <button @click="logout"> Logout </button>
      <button @click="getapi"> GET_API using Async Action Axios </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Customer",
    computed: {
      totalTvCount() {    
        // lay data tu State trong Vuex            
        return this.$store.state.totalTvCount;
      },
      getTotal() {
        // lay data tu Getters trong Vuex  
        return this.$store.getters.getTotal;
      },
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      }
    },
    methods: {
      removeTV() {
        if(confirm('Are you sure ?')) {
          // Goi truc tiep Mutation trong Vuex, đối với các sự kiện đồng bộ
          this.$store.commit('removeTv')
        }
      },
      setTV () {
        this.$store.commit('SET_TV', 50)
      },
      login () {
        // Goi den Action trong Vuex, doi voi su kien khong dong bo
        this.$store.dispatch('login')
      },
      logout () {
        this.$store.dispatch('logout')
      },
      getapi () {
        this.$store.dispatch('get_api')
      }
    }
  };
</script>

<style scoped>
</style>