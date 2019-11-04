<template>
  <transition name="fade">
    <div id="app">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </transition>
</template>

<script>
  import Factory from '@/repositories/RepositoryFactory'
  import { LocalStorageSetting } from '@/settings'
  import { isObjectEmpty } from '@/helpers'

  const SettingR = Factory.get('setting')
  const KEY_SETTING = LocalStorageSetting.KEY_SETTING

  export default {
    name: 'App',
    data () {
      return {
        section: 'Head',
        lsSetting: {}
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

      this.init()
    },
    methods: {
      async init() {
        // init localStorage for settings dynamic
        const settings = JSON.parse(window.localStorage.getItem(KEY_SETTING) || 'null')
        if (!settings || isObjectEmpty(settings)) { // load lan dau tien, khi key chua co trong localStorage hoac key rong
          await this.getSettings()
          this.saveLocalStorage()
        }
      },
      async getSettings() {
        try {
          const result = await SettingR.get()
          const data = result.data.data
          let len = data.length
          for (let i = 0; i < len; i++) {
            this.lsSetting[data[i].name] = data[i] // them attribute cho object
          }
        } catch (err) {
          console.error(err)
        }
      },
      saveLocalStorage() {
        window.localStorage.setItem(KEY_SETTING, JSON.stringify(this.lsSetting))
      }
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
