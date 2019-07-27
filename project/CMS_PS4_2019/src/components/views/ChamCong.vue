<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <p-radio name="chamcong" color="success-o" v-model="rdType" value="1">CheckIn</p-radio>
        <p-radio name="chamcong" color="success-o" v-model="rdType" value="2">CheckOut</p-radio>
        <button type="button" class="btn btn-primary"> Thanh toán </button>
      </div>
    </div>
  </section>
</template>

<script>
// import api from '@/api'

export default {
  name: 'ChamCong',
  data() {
    return {
      rdType: '1'
    }
  },
  async created() {
  },
  methods: {
    showToast() {
      this.$swal({
        type: 'success',
        title: 'Cập nhật thành công',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
    }
  },
  components: {
  }
}
</script>

<style scoped>
</style>

