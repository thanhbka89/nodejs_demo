<template>
  <div id="login">
    <img src="/static/img/logo.png" class="center-block logo">

    <div class="text-center col-sm-12">
      <!-- login form -->
      <form @submit.prevent="checkCreds">
        <div class="input-group">
          <span class="input-group-addon">
            <i class="fa fa-envelope"></i>
          </span>
          <input
            class="form-control"
            name="username"
            placeholder="Username"
            type="text"
            v-model="username"
            autocomplete="off"
          >
        </div>

        <div class="input-group">
          <span class="input-group-addon">
            <i class="fa fa-lock"></i>
          </span>
          <input
            class="form-control"
            name="password"
            placeholder="Password"
            type="password"
            v-model="password"
          >
        </div>
        <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Đăng nhập</button>
      </form>

      <!-- errors -->
      <div v-if="response" class="text-red">
        <p class="vertical-5p lead">{{response}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api, { BN_API } from '@/api'
import { getBrowser } from '@/helpers'

export default {
  name: 'Login',
  data(router) {
    return {
      section: 'Login',
      loading: '',
      username: '',
      password: '',
      response: '',
      history: {
        ip: '127.0.0.1'
      }
    }
  },
  methods: {
    checkCreds() {
      const { username, password } = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      /* Making API call to authenticate a user */
      api
        .request('post', '/authen/login', { username, password })
        .then(response => {
          this.toggleLoading()

          let data = response.data
          data.redirect = this.$route.query.redirect || ''

          /* Setting user in the state and caching record to the localStorage */
          if (data.success) {
            // Ghi log
            this.history.id_user = data.user.id
            this.saveHistoryLogin()

            let token = 'Bearer ' + data.token

            this.$store.commit('SET_USER', data.user)
            this.$store.commit('SET_TOKEN', token)

            if (window.localStorage) {
              window.localStorage.setItem('user', JSON.stringify(data.user))
              window.localStorage.setItem('token', token)
            }

            this.$router.push(data.redirect ? data.redirect : '/')
          } else {
            /* Checking if error object was returned from the server */
            this.response = data.data

            return
          }
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          console.log(error)

          this.response = 'Server appears to be offline'
          this.toggleLoading()
        })
    },
    toggleLoading() {
      this.loading = this.loading === '' ? 'loading' : ''
    },
    resetResponse() {
      this.response = ''
    },
    async saveHistoryLogin() {
      try {
        await this.getIP()
        this.history.browser = getBrowser()
        await api.request('post', '/history_login', this.history)
      } catch (e) {
        console.error(e)
      }
    },
    async getIP() {
      try {
        let res = await BN_API.get('https://api.ipify.org/?format=json')
        this.history.ip = res.data.ip || 'localhost'
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style>
#login {
  padding: 5em;
}

html,
body,
.container-table {
  height: 100%;
  background-color: #282b30 !important;
}
.container-table {
  display: table;
  color: white;
}
.vertical-center-row {
  display: table-cell;
  vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.vertical-5p {
  padding-top: 5%;
}
.logo {
  width: 15em;
  padding: 3em;
}

.input-group {
  padding-bottom: 2em;
  height: 4em;
  width: 100%;
}

.input-group span.input-group-addon {
  width: 2em;
  height: 4em;
}

@media (max-width: 1241px) {
  .input-group input {
    height: 4em;
  }
}
@media (min-width: 1242px) {
  form {
    padding-left: 20em;
    padding-right: 20em;
  }

  .input-group input {
    height: 6em;
  }
}

.input-group-addon i {
  height: 15px;
  width: 15px;
}
</style>
