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
      <template v-if="isCheckout">
      <div class="col-md-2">
        Số giờ đã chơi:
      </div>      
      <div class="col-md-10">
        <strong>{{ps4.play_hour}} ({{ps4.elapsed}} phút)</strong>
      </div>
      </template>

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
                <tr v-if="isCheckout">
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
                <tr v-for="(item, index) in items" :key="index">
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
      <div class="col-xs-12 text-center" v-if="show && isCheckout">        
        <button type="button" class="btn btn-success" @click="showAlertConfirm"><i class="fa fa-credit-card-alt text-orange" aria-hidden="true"></i> Thanh toán</button>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 text-left">
         <button type="button" class="btn btn-default" @click="onBack"><i class="fa fa-backward text-red" aria-hidden="true"></i> Quay lại</button>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import api from '../../api'

export default {
  name: 'CheckOut',
  data() {
    return {
      ps4: {},
      items: [],
      startDate: '',
      total: 0,
      show: true,
      isCheckout: false,
      api_ps4: {} // gia choi PS4 tu api
    }
  },
  created() {
    const {command} = this.$route.query
    const {id} = this.$route.params
    if (command === 'checkout') {
      // Thanh Toan
      let local = JSON.parse(window.localStorage.getItem(id) || 'null')
      this.show = false
      if (local) {
        this.show = this.isCheckout = true
        this.ps4 = local
        if (local.items && local.items.length) {
          this.items = local.items
        }
        this.startDate = moment(local.start).format('DD/MM/YYYY')
      }
      // tinh tong tien thanh toan
      this.caclTotal()
    } else if (command === 'view') {
      this.getCheckoutDetail(id)
    }
  },
  methods: {
    checkout() {
      window.localStorage.removeItem(this.ps4.id)
      this.show = false
      this.insert()
    },
    async getCheckoutDetail(id) {
      const result = await api.request('get', `/trans/detail/${id}`)
      const arrLen = result.data.data.length
      if (result.data.success && arrLen) {
        let tranObj = result.data.data[0]
        this.ps4.id = tranObj.t1_id_ps
        this.startDate = moment(tranObj.t1_created_at).format('DD/MM/YYYY')
        this.ps4.start_hour = moment(tranObj.t2_start).format('HH:mm')
        this.total = tranObj.t1_total_money
        this.items = []
        let items = []
        // get danh sach dich vu
        for (let index = 0; index < arrLen; index += 1) {
          tranObj = result.data.data[index]
          let temp = await api.request('get', `/item/${tranObj.t2_id_item}`)
          if (temp.data.length) {
            let item = temp.data[0]
            items.push({id: index, quantity: tranObj.t2_quantity, name: {name: item.name, gia_ban: item.gia_ban}})
          }
        }
        this.items = items
      }
    },
    async caclTotal() {
      // tinh tien gio choi
      const result = await api.request('get', '/item/f/get_price_ps4')
      this.api_ps4 = result.data[0]
      this.total = Math.ceil((this.ps4.elapsed / 60).toFixed(2) * this.api_ps4.gia_ban) // Math.ceil(20000 / 60 * this.ps4.elapsed)

      // tinh tien dich vu
      if (this.ps4.items && this.ps4.items.length) {
        let temp = this.ps4.items.reduce((sum, current) => {
          return sum + current.name.gia_ban * current.quantity
        }, 0)
        this.total += temp
      }
    },
    insert() {
      const data = {
        ps: 1,
        user: 0,
        money: this.total,
        items: this.ps4.items || []
      }
      // push gio choi ps4
      data.items.push({id: 0, name: this.api_ps4, quantity: (this.ps4.elapsed / 60).toFixed(2), start: this.ps4.end})
      api
        .request('post', '/trans', data)
        .then(response => {
          console.log(response)
          if (response.data.success) {
            this.showAlert()
          } else {
            this.showToast('warning', response.data.data.code)
          }
        })
        .catch(e => {
          this.showToast('error', e)
          console.error(e)
        })
    },
    onBack() {
      this.$router.go(-1)
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
    },
    showToast(type = 'success', message = '') {
      this.$swal({
        type: type,
        title: message || `Cập nhật thành công`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000
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
