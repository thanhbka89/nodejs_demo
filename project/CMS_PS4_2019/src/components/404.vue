<template>
  <div id="notFound">
    <img src="/static/img/logo.png" class="center-block logo">

    <div class="text-center col-sm-12">
      <h4>Không tìm thấy trang.</h4>
      <router-link to="/" class="vertical-5p lead">Quay lại Trang chủ.</router-link>
      <div><a href="#" @click.prevent="back">Go back</a></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NotFound',
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
#notFound {
  padding: 10em;
  color: white;
}
</style>
