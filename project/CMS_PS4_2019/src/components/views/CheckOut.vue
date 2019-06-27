<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <h2>CheckOut {{$route.params.id}}</h2>
        <p>Máy số: {{ps4.id}}</p>
        <p>{{ps4.origin}}</p>
        <p>Bắt đầu: {{ps4.start_hour}}</p>
        <p>Số giờ đã chơi: {{ps4.play_hour}} ({{ps4.elapsed}} phút)</p>
      </div>
      <div class="col-xs-12" v-if="show">
        <button type="button" class="btn btn-success" @click="checkout()">Thanh toán</button>
        </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CheckOut',
  data() {
    return {
      ps4: {},
      show: true
    }
  },
  created() {
    let local = JSON.parse(window.localStorage.getItem(this.$route.params.id) || 'null')
    this.show = false
    if (local) {
      this.show = true
      this.ps4 = local
    }
  },
  methods: {
    checkout() {
      window.localStorage.removeItem(this.ps4.id)
      this.show = false
      this.showAlert()
    },
    showAlert() {
      this.$swal('Thanh toán thành công!')
    }
  }
}
</script>

<style scoped>
</style>
