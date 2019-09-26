<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12 text-center">
        <h2>HÓA ĐƠN DỊCH VỤ</h2>
      </div>
      <template v-if="isCheckout">
        <div class="col-xs-12">
          <p>
            <p-check name="check" color="success" v-model="tranNoPlay" @change="confirmOtherTrans">
              <strong>GIAO DỊCH KHÁC (Không tính giờ chơi)</strong>
            </p-check>
          </p>
        </div>
      </template>
      <div class="col-md-2">
        Máy số:
      </div>
      <div class="col-md-10">
        <strong>{{ps4.name}}</strong>
      </div>
      <div class="col-md-2">
        Ngày hóa đơn:
      </div>
      <div class="col-md-10">
        <strong>{{startDate}}</strong>
      </div>
      <div class="col-md-2 members">
        Khách hàng:
      </div>
      <div class="col-md-10">
        <div v-if="isCheckout">
          <multiselect v-model="memberSelected" :options="members" :custom-label="nameWithLang" placeholder="Chọn khách hàng" label="username" track-by="username" @input="caclTotal"></multiselect>
        </div>
        <strong v-else>{{ displayName }}</strong>
      </div>
      <div class="col-md-2">
        Bắt đầu:
      </div>
      <div class="col-md-10">
        <strong>{{ps4.start_hour}}</strong>
      </div>
      <template v-if="!isCheckout">
      <div class="col-md-2">
        Kết thúc:
      </div>
      <div class="col-md-10">
        <strong>{{ps4.finishedDate}}</strong>
      </div>
      <div class="col-md-2">
        Điểm tích được:
      </div>
      <div class="col-md-4">
        <strong>{{ ps4.t1_diem_tich }}</strong>
      </div>
      <div class="col-md-2">
        Điểm đã tiêu:
      </div>
      <div class="col-md-4">
        <strong>{{ ps4.t1_diem_tieu }}</strong>
      </div>
      <div class="col-md-2">
        Người tạo:
      </div>
      <div class="col-md-10">
        <strong>{{ ps4.t1_created_by }}</strong>
      </div>
      </template>
      <template v-if="isCheckout">
      <div class="col-md-2">
        Số giờ đã chơi:
      </div>      
      <div class="col-md-10">
        <strong>{{ps4.play_hour}} ({{ps4.elapsed}} phút)</strong>
      </div>
      </template>

      <template v-if="isCheckout && this.memberSelected && this.memberSelected.id && hasPointSetting">
        <div class="col-xs-12">
          <br />
          <p>
            Khách hàng <strong>{{this.memberSelected.username || 'N/A'}}</strong> 
            có thể sử dụng số điểm để thanh toán: <strong>{{avaliablePoint}}</strong>
          </p>
          <p>
            <p-check name="check" color="success" v-model="usePoint" @change="clearErrorMsg">
              <strong>SỬ DỤNG ĐIỂM ĐỂ THANH TOÁN</strong>
            </p-check>
          </p>
          
          <div class="row" v-if="usePoint">
            <div class="col-md-3">
              Chọn số điểm sẽ dùng:
            </div>  
            <div class="col-md-9">
              <input v-model="numberPoint" @input="clearErrorMsg"
              style="padding: 3px" />
              <span style="color: red; margin-left: 20px;">{{ errorMsg }}</span>
              <br /><br /><br />
              <vue-slider
                v-model="numberPoint"
                :min="0"
                :max="avaliablePoint"
                :tooltip="errorMsg ? 'none' : 'always'"
                :marks="[0, avaliablePoint]"
                @error="error"
                @change="clearErrorMsg"
              ></vue-slider>
            </div>
          </div>
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
                  <th class="text-right">Giảm giá %</th>
                  <th class="text-right">Tổng tiền</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <td colspan="5" class="text-right"></td>
                  <td colspan="2" class="text-right"><br /></td>
                </tr>
                <tr>
                  <td colspan="5" class="text-right">
                    <strong>Tổng tiền thanh toán:</strong></td>
                  <td colspan="2" class="text-right"><strong>{{total | toVnd }}</strong></td>
                </tr>
              </tfoot>
              <tbody>
                <tr v-if="isCheckout">
                  <td class="col-xs-1">0</td>
                  <td class="col-xs-3">{{ api_ps4.name || 'Giờ chơi PS4' }}</td>
                  <td class="col-xs-1">{{ api_ps4.gia_ban || 0 | toVnd }}</td>
                  <td class="col-xs-1 text-center">
                    {{ so_giochoi }}
                  </td>
                  <td class="col-xs-2 text-right">
                    {{ Math.ceil(so_giochoi * (api_ps4.gia_ban || 0)) | toVnd }}
                  </td>
                  <td class="col-xs-2 text-right">
                    {{ percentDiscount }} %
                  </td>
                  <td class="col-xs-2 text-right">
                   {{ Math.ceil(so_giochoi * (api_ps4.gia_ban || 0) * (100 - this.percentDiscount) / 100) | toVnd }}
                  </td>
                </tr>
                <tr v-for="(item, index) in items" :key="index">
                  <td class="col-xs-1">{{ ++index }}</td>
                  <td class="col-xs-3">{{ item.name.name }}</td>
                  <td class="col-xs-1">{{ item.name.gia_ban | toVnd }}</td>
                  <td class="col-xs-1 text-center">
                    {{ item.quantity }}
                  </td>
                  <td class="col-xs-2 text-right">
                    {{ item.name.gia_ban * item.quantity | toVnd }}
                  </td>
                  <td class="col-xs-2 text-right">
                    {{ item.discount || 0 }} %
                  </td>
                  <td class="col-xs-2 text-right">
                   {{ item.name.gia_ban * item.quantity * (1 - (item.discount || 0) / 100) | toVnd }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-xs-12 text-center" v-if="show && isCheckout">        
        <button type="button" class="btn btn-success" @click="showAlertConfirm">
          <i class="fa fa-credit-card-alt text-orange" aria-hidden="true"></i> 
          Thanh Toán
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 text-left">
         <button type="button" class="btn btn-default" @click="onBack">
           <i class="fa fa-backward text-red" aria-hidden="true"></i> 
           Quay lại
          </button>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import api from '@/api'
import Multiselect from 'vue-multiselect'
import VueSlider from 'vue-slider-component'
import { UserSetting, CheckOutSetting } from '@/settings'

const ERROR_TYPE = {
  VALUE: 1,
  INTERVAL: 2,
  MIN: 3,
  MAX: 4,
  ORDER: 5
}

export default {
  name: 'CheckOut',
  components: { Multiselect, VueSlider },
  data() {
    return {
      ps4: {
        elapsed: 0
      },
      psLocal: {},
      items: [],
      startDate: '',
      total: 0,
      show: true,
      isCheckout: false,
      api_ps4: {}, // gia choi PS4 tu api
      memberSelected: null,
      members: [], // get list members from api

      hasPointSetting: CheckOutSetting.HAS_POINT, // ap dung tich diem
      numberPoint: 0,
      usePoint: false,
      errorMsg: '',

      // ap dung chiet khau va chon hinh thuc chiet khau
      discountType: CheckOutSetting.HAS_DISCOUNT
        ? CheckOutSetting.SELECT_TYPE_DISCOUNT : null,
      tranNoPlay: false, // Giao dich phat sinh, ko tinh gio choi
      moneyPS: 0 // So tien choi PS
    }
  },
  computed: {
    displayName () {
      let name = this.memberSelected
        ? `${this.memberSelected.username} - ${this.memberSelected.phone || ''}`
        : 'Khách lẻ'
      return name
    },
    avaliablePoint() {
      return this.memberSelected
        ? this.memberSelected.diem_tich - this.memberSelected.diem_tieu
        : 0
    },
    so_giochoi() {
      return this.ps4.elapsed
        ? (this.ps4.elapsed / 60).toFixed(2)
        : 0
    },
    percentDiscount() {
      let discount = 0
      if (this.memberSelected && this.discountType) {
        switch (this.memberSelected.type) {
          case UserSetting.TYPE_DIAMOND:
            discount = CheckOutSetting.DISCOUNT_DIAMOND
            break
          case UserSetting.TYPE_VIP:
            discount = CheckOutSetting.DISCOUNT_VIP
            break
          case UserSetting.TYPE_LOYAL:
            discount = CheckOutSetting.DISCOUNT_LOYAL
            break
        }
      }

      return discount
    }
  },
  async created() {
    const {command} = this.$route.query
    const {id} = this.$route.params
    if (command === 'checkout') {
      // Thanh Toan
      let local = JSON.parse(window.localStorage.getItem(id) || 'null')
      this.show = false
      if (local) {
        this.show = this.isCheckout = true
        this.ps4 = local
        this.psLocal = JSON.parse(window.localStorage.getItem(id) || 'null') // info ps on localstorage
        if (local.items && local.items.length) {
          this.items = local.items
        }
        this.startDate = moment(local.start).format('DD/MM/YYYY')
        // get info ps4 from api
        await this.getApiPs4()
        // get members active
        await this.getMembers()
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
        await this.getMemberDetail(tranObj.t1_id_user)
        let objPs = await this.getPSDetail(tranObj.t1_id_ps)
        this.ps4 = tranObj
        this.ps4.id = tranObj.t1_id_ps
        this.ps4.name = objPs.name
        this.startDate = moment(tranObj.t1_created_at).format('DD/MM/YYYY')
        this.ps4.finishedDate = moment(tranObj.t1_updated_at).format('DD/MM/YYYY HH:mm')
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
            items.push({
              id: index,
              quantity: tranObj.t2_quantity,
              name: {name: item.name, gia_ban: item.gia_ban},
              discount: tranObj.t2_discount
            })
          }
        }
        this.items = items
      }
    },
    caclTotal() {
      // tinh tien gio choi PS
      // @26.08.2019 : dang chi ap dung chiet khau cho gio choi PS
      let moneyPS = this.so_giochoi * this.api_ps4.gia_ban
      // neu ap dung chiet khau
      if (this.discountType === CheckOutSetting.TYPE_DISCOUNT_PS) {
        moneyPS = moneyPS * (100 - this.percentDiscount) / 100
      }
      this.total = Math.ceil(moneyPS)
      this.moneyPS = Math.ceil(moneyPS)

      // tinh tien dich vu
      if (this.ps4.items && this.ps4.items.length) {
        let temp = this.ps4.items.reduce((sum, current) => {
          return sum + current.name.gia_ban * current.quantity
        }, 0)
        this.total += temp
      }
    },
    async getApiPs4() {
      // get price of ps
      try {
        const result = await api.request('get', `/item/f/get_price?status=1&code=${this.ps4.code}`)
        this.api_ps4 = result.data[0]
      } catch (e) {
        console.error(e)
      }
    },
    async getPSDetail(id) {
      let response = {}
      try {
        // get list ps4 active
        const result = await api.request('get', `/ps/${id}`)
        if (result.data.success) {
          response = result.data.data[0]
        }
      } catch (e) {
        console.error(e)
      }

      return response
    },
    async getMembers() {
      try {
        const response = await api.request('get', `/user/p/1?status=1&limit=1000`)
        this.members = response.data
        // add Khach le vao dau mang
        this.members.unshift({id: 0, fullname: 'Khách lẻ', username: '.', phone: '.'})
      } catch (err) {
        console.error(err)
      }
    },
    async getMemberDetail(id) {
      try {
        const response = await api.request('get', `/user/action/${id}`)
        this.memberSelected = response.data.data[0]
      } catch (err) {
        console.error(err)
      }
    },
    nameWithLang ({ username, fullname, phone }) {
      return `[${username}] - ${fullname} - [${phone}]`
    },
    insert() {
      const data = {
        ps: this.ps4.id_ps || 1,
        user: this.memberSelected.id || 0,
        money: this.total,
        items: this.ps4.items || [],
        start: this.ps4.end, // bat dau cua giao dich
        // Tich diem = thoi gian choi (phut) x 5%
        diem_tich: this.hasPointSetting
          ? Math.ceil(this.ps4.elapsed * CheckOutSetting.POINT_EARN / 100)
          : 0,
        diem_tieu: this.hasPointSetting && this.usePoint
          ? this.numberPoint : 0
      }
      // push gio choi ps4
      if (!this.tranNoPlay) { // giao dich binh thuong
        data.items.push({
          id: 0,
          name: this.api_ps4,
          quantity: this.so_giochoi,
          start: this.ps4.end,
          // hien dang chi ap dung chiet khau cho gio choi
          discount: this.discountType
            ? this.percentDiscount
            : 0
        })
      } else { // giao dich Dịch vụ
        data.money = Math.ceil(this.total - this.moneyPS)
        data.diem_tich = 0
        data.diem_tieu = 0
      }
      api
        .request('post', '/trans', data)
        .then(response => {
          if (response.data.success) {
            data.items.pop() // Xoa last element, ko cho hien thi len man hinh
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
    error(type, msg) {
      switch (type) {
        case ERROR_TYPE.MIN:
          break
        case ERROR_TYPE.MAX:
          break
        case ERROR_TYPE.VALUE:
          break
      }
      this.errorMsg = msg

      // Neu co loi xay ra, gan lai so phut da choi
      this.ps4.elapsed = this.psLocal.elapsed
    },
    clearErrorMsg() {
      // Neu check nut su dung diem
      if (this.usePoint && !this.errorMsg.length) {
        if (this.numberPoint > this.psLocal.elapsed) {
          this.showWarning('Số điểm sử dụng phải <= số phút đã chơi !')
          this.numberPoint = this.psLocal.elapsed
        }
        this.ps4.elapsed = this.psLocal.elapsed - this.numberPoint
      } else {
        this.ps4.elapsed = this.psLocal.elapsed
      }
      // Tinh toan lai tong tien
      this.caclTotal()

      this.errorMsg = ''
    },
    showWarning(msg = null) {
      this.$swal(
            'Cảnh báo!',
            msg || 'Vui lòng chọn khách hàng!',
            'warning'
          )
    },
    showAlert() {
      this.$swal(
            'Hoàn thành!',
            'Thanh toán thành công!',
            'success'
          )
    },
    showAlertConfirm() {
      if (this.memberSelected) {
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
      } else {
        this.showWarning()
      }
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
    },
    confirmOtherTrans() {
      if (this.tranNoPlay) {
        this.$swal({
          title: 'Thực hiện giao dịch Dịch vụ?',
          text: 'Bạn có muốn thực hiện ?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Đồng ý'
        }).then((result) => {
          if (!result.value) {
            this.tranNoPlay = false
          }
        })
      }
    }
  }
}
</script>

<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.content {
  padding: 10px 50px;
}
/* .members {
  margin-top: 10px;
} */
</style>
