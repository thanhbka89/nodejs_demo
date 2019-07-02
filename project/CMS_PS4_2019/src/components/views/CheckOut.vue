<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12 text-center">
        <h2>HÓA ĐƠN DỊCH VỤ</h2>
      </div>
      <div class="col-md-2">
        Máy số:
      </div>
      <div class="col-md-10">
        <strong>{{ps4.id}}</strong>
      </div>
      <div class="col-md-2">
        Ngày hóa đơn:
      </div>
      <div class="col-md-10">
        <strong>{{startDate}}</strong>
      </div>
      <div class="col-md-2">
        Khách hàng:
      </div>
      <div class="col-md-10">
        <strong>Khách lẻ</strong>
      </div>
      <div class="col-md-2">
        Bắt đầu:
      </div>
      <div class="col-md-10">
        <strong>{{ps4.start_hour}}</strong>
      </div>
      <div class="col-md-2">
        Số giờ đã chơi:
      </div>
      <div class="col-md-10">
        <strong>{{ps4.play_hour}} ({{ps4.elapsed}} phút)</strong>
      </div>

      <div class="col-xs-12">
        <br />
        <p>DANH SÁCH DỊCH VỤ ĐÃ SỬ DỤNG:</p>
      </div>
      <div class="col-xs-12">
        <div class="box">
          <div class="box-body table-responsive no-padding">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Dịch vụ</th>
                  <th>Đơn giá</th>
                  <th class="text-center">Số lượng</th>
                  <th class="text-right">Thành tiền</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <td colspan="4" class="text-right">Chiết khấu:</td>
                  <td>0%</td>
                </tr>
                <tr>
                  <td colspan="4" class="text-right">
                    <strong>Tổng tiền thanh toán:</strong></td>
                  <td class="text-right"><strong>{{total | toVnd }}</strong></td>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td class="col-xs-1">0</td>
                  <td class="col-xs-5">{{'Giờ chơi PS4'}}</td>
                  <td class="col-xs-3">{{20000 | toVnd}}</td>
                  <td class="col-xs-1 text-center">
                    {{(ps4.elapsed / 60).toFixed(2)}}
                  </td>
                  <td class="col-xs-2 text-right">
                   {{Math.ceil((ps4.elapsed / 60).toFixed(2) * 20000) | toVnd}}
                  </td>
                </tr>
                <tr v-for="(item, index) in ps4.items" :key="index">
                  <td class="col-xs-1">{{++index}}</td>
                  <td class="col-xs-5">{{item.name.name}}</td>
                  <td class="col-xs-3">{{item.name.gia_ban | toVnd}}</td>
                  <td class="col-xs-1 text-center">
                    {{item.quantity}}
                  </td>
                  <td class="col-xs-2 text-right">
                   {{item.name.gia_ban * item.quantity | toVnd}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-xs-12 text-center" v-if="show">        
        <button type="button" class="btn btn-success" @click="showAlertConfirm"><i class="fa fa-credit-card-alt" aria-hidden="true"></i> Thanh toán</button>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  name: 'CheckOut',
  data() {
    return {
      ps4: {},
      startDate: '',
      total: 0,
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
      this.startDate = moment(local.start).format('DD/MM/YYYY')
    }

    // tinh tong tien thanh toan
    this.caclTotal()
  },
  methods: {
    checkout() {
      window.localStorage.removeItem(this.ps4.id)
      this.show = false
      this.showAlert()
    },
    caclTotal() {
      // tinh tien gio choi
      this.total = Math.ceil((this.ps4.elapsed / 60).toFixed(2) * 20000) // Math.ceil(20000 / 60 * this.ps4.elapsed)

      // tinh tien dich vu
      let temp = this.ps4.items.reduce((sum, current) => {
        return sum + current.name.gia_ban * current.quantity
      }, 0)
      this.total += temp
    },
    showAlert() {
      this.$swal(
            'Hoàn thành!',
            'Thanh toán thành công!',
            'success'
          )
    },
    showAlertConfirm() {
      this.$swal({
        title: 'Bạn có chắc?',
        text: 'Bạn có muốn thực hiện thanh toán?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý'
      }).then((result) => {
        if (result.value) {
          this.checkout()
        }
      })
    }
  }
}
</script>

<style scoped>
.content {
  padding: 10px 50px;
}
</style>
