<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <h2>Hoa don dich vu may {{$route.params.id}}</h2>
        <p>Máy số: {{ps4.id}}</p>
        <p>Ngay hoa don: {{new Date()}}</p>
        <p>Khach hang: Khach le</p>
        <p>Bắt đầu: {{ps4.start_hour}}</p>
        <p>Số giờ đã chơi: {{ps4.play_hour}} ({{ps4.elapsed}} phút)</p>
        <p>Danh sach dich vu su dung:</p>
      </div>
      <div class="col-xs-12">
        <div class="box">
          <div class="box-body table-responsive no-padding">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Dich vu</th>
                  <th>Gia</th>
                  <th>Số lượng</th>
                  <th>Thanh tien</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in ps4.items" :key="index">
                  <td class="col-xs-1">{{++index}}</td>
                  <td class="col-xs-3">{{item.name.name}}</td>
                  <td class="col-xs-2">{{item.name.gia_ban | toVnd}}</td>
                  <td class="col-xs-3">
                    {{item.quantity}}
                  </td>
                  <td class="col-xs-3">
                   {{item.name.gia_ban * item.quantity | toVnd}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
    let local = JSON.parse(
      window.localStorage.getItem(this.$route.params.id) || 'null'
    )
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
