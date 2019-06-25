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
    </div>
  </section>
</template>

<script>
export default {
  name: 'CheckOut',
  data() {
    return {
      ps4: {}
    }
  },
  created() {
    let local = window.localStorage.getItem(this.$route.params.id) || 'null'
    let localPS = JSON.parse(local)
    if (localPS) {
      this.ps4 = localPS
    }
  }
}
</script>

<style scoped>
</style>
