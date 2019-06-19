<template>
  <div class="login">
    <!-- <div v-if="loggingIn" class="container-loading">
      <img src="/loading.gif" alt="Loading Icon">
    </div>
    <p v-if="loginError">{{ loginError }}</p>
    <p v-if="loginSuccessful">Login Successful</p>-->
    <form @submit.prevent="loginSubmit">
      <!-- <input type="email" placeholder="E-Mail" v-model="email"> -->
      <input type="text" placeholder="Username" v-model="input.username" required>
      <input type="password" placeholder="Password" v-model="input.password" required>
      <button type="submit">Login</button>
    </form>
    <Loading v-if="loading"></Loading>
  </div>
</template>

<script>
import Loading from "./Loading.vue";
import { setTimeout } from "timers";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    loginSubmit() {
      const { username, password } = this.input;
      if (username != "" && password != "") {
        if (username === "thanhnm" && password === "123") {
          // show the loading message
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            localStorage.setItem('user', JSON.stringify({username: 'thanhnm', address: 'Ha Noi'}))
            localStorage.setItem("token", "OK");

            this.$store.dispatch('login')
            //this.$emit("authenticated", true)
            this.$router.push({ name: "News" });
          }, 5000);
        } else {
          localStorage.clear()
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    }
  },
  components: {
    Loading
  }
};
</script>

<style scoped lang="scss">
.login {
  border: 1px solid black;
  border-radius: 5px;
  padding: 1.5rem;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  .container-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    img {
      width: 2rem;
      height: 2rem;
    }
  }
  form {
    display: flex;
    flex-flow: column;
    *:not(:last-child) {
      margin-bottom: 1rem;
    }
    input {
      padding: 0.5rem;
    }
    button {
      padding: 0.5rem;
      background-color: lightgray;
      border: 1px solid gray;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background-color: lightslategray;
      }
    }
  }
}
</style>