export default {
  // The install method will be called with the Vue constructor as the first argument, along with possible options
  install(Vue, options) {
    // ES6 way of const job = options.job
    // const { job } = options

    // Add $plugin instance method directly to Vue components
    Vue.prototype.$showToast = function ({ type = 'success', message = 'Cập nhật thành công', time = 5000 }) {
      this.$swal({
        type,
        title: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: time
      })
    }

    // Add $surname instance property directly to Vue components
    Vue.prototype.$author = 'thanhbka@yahoo.com'
  }
}
