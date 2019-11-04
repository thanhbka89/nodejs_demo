<template>
  <div>
    <h1 class="text-center">Cài đặt Thanh toán</h1>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <vue-tabs active-tab-color="#f39c12" active-text-color="white">
            <v-tab title="Xếp hạng thành viên" icon="fa fa-cogs">
              <div class="row content">
                <div class="col-xs-12">
                  <p class="margin_top">
                    <p-check name="check" color="success" v-model="hasRank" @change="changeRank">
                      <strong>ÁP DỤNG PHÂN HẠNG THÀNH VIÊN</strong>
                    </p-check>
                  </p>
                  <template v-if="hasRank">
                    <div class="margin_top">
                      <i>Xếp hạng tăng dần theo thứ tự: <b>KH Thân thiết >> KH VIP >> KH Diamond</b></i>
                    </div>
                    <div class="row margin_top">
                      <div class="col-xs-7">
                        Để là khách hàng <strong>VIP</strong>, số lần giao dịch Khách hàng cần chơi >=
                      </div>
                      <div class="col-xs-5">
                        <input type="number" v-model="optionRank.vip" value="100" min="1"/>
                      </div>
                    </div>
                    
                    <div class="row margin_top">
                      <div class="col-xs-7">
                        Để là khách hàng <strong>DIAMOND (Kim Cương)</strong>, số lần giao dịch Khách hàng cần chơi >=
                      </div>
                      <div class="col-xs-5">
                        <input type="number" v-model="optionRank.diamond"  value="300" min="1"/>
                      </div>
                    </div>
                  </template>
                </div>
                <div class="col-xs-12 margin_top">
                  <button type="button" class="btn btn-success" @click="modifyRank">Cập nhật</button>
                </div>
              </div>
            </v-tab>

            <v-tab title="Tích điểm" icon="fa fa-cog">
              <div class="row content">
                <div class="col-xs-12">
                  <p class="margin_top">
                    <p-check name="check" color="success" v-model="hasPoint" @change="changeRank">
                      <strong>ÁP DỤNG TÍCH/TIÊU ĐIỂM CHO THÀNH VIÊN</strong>
                    </p-check>
                  </p>
                  <template v-if="hasPoint">
                    <div class="row margin_top">
                      <div class="col-xs-12">
                        <i>
                          Áp dụng chung cho tất cả khách hàng <b>(Thân thiết, VIP, Diamond)</b>. Điểm có giá trị tương đương Phút, nghĩa là <strong>1 điểm = 1 phút</strong>
                        </i>
                      </div>

                      <div class="col-xs-5 margin_top">
                        Tỷ lệ % số điểm được tích cho 1 lần chơi (giao dịch)
                      </div>
                      <div class="col-xs-7 margin_top">
                        <input type="number" v-model="optionPoint.rate_tich_diem" value="10" min="1"/>
                      </div>

                      <div class="col-xs-12 margin_top">
                        <strong>Ví dụ: </strong>Khách chơi được 3h = 3 x 60 = <b>180 phút</b>. Tỷ lệ % để là <b>5</b>
                        <p>=> Do đó số điểm mà khách tích được = 180 x 5 / 100 = 9 điểm (phút) </p>
                      </div>
                    </div>
                  </template>
                </div>
                <div class="col-xs-12 margin_top">
                  <button type="button" class="btn btn-success" @click="modifyPoint">Cập nhật</button>
                </div>
              </div>
            </v-tab>

            <v-tab title="Chiết khấu" icon="fa fa-cogs">
              <div class="row content">
                <div class="col-xs-12">
                  <p class="margin_top">
                    <p-check name="check" color="success" v-model="hasDiscount" @change="changeRank">
                      <strong>ÁP DỤNG CHIẾT KHẤU (KHUYẾN MÃI) CHO THÀNH VIÊN</strong>
                    </p-check>
                  </p>
                  <template v-if="hasDiscount">
                    <div class="margin_top">
                      <i><b>Chỉ áp dụng cho Giờ chơi, không áp dụng cho Dịch vụ (Nước uống, thuốc, ...).</b> Xếp hạng tăng dần theo thứ tự: <b>KH Thân thiết >> KH VIP >> KH Diamond</b></i>
                    </div>

                    <div class="row margin_top">
                      <div class="col-xs-7">
                        Khách hàng <strong>Thân thiết</strong>, Tỷ lệ % chiết khấu
                      </div>
                      <div class="col-xs-5">
                        <input type="number" v-model="optionDiscount.loyal" value="0" min="0"/>
                      </div>
                    </div>

                    <div class="row margin_top">
                      <div class="col-xs-7">
                        Khách hàng <strong>VIP</strong>, Tỷ lệ % chiết khấu
                      </div>
                      <div class="col-xs-5">
                        <input type="number" v-model="optionDiscount.vip" value="10" min="1"/>
                      </div>
                    </div>
                    
                    <div class="row margin_top">
                      <div class="col-xs-7">
                        Khách hàng <strong>DIAMOND (Kim Cương)</strong>, Tỷ lệ % chiết khấu
                      </div>
                      <div class="col-xs-5">
                        <input type="number" v-model="optionDiscount.diamond"  value="10" min="1"/>
                      </div>
                    </div>

                    <div class="margin_top">
                      <strong>Ví dụ: </strong>Giá 1h chơi = <b>20.000 VND</b>. Tỷ lệ % chiết khấu để là <b>25</b>
                      <p>=> Giá 1h chơi = 20000 x 5 / 100 = <b>15.000 VND</b></p>
                    </div>
                  </template>
                </div>
                <div class="col-xs-12 margin_top">
                  <button type="button" class="btn btn-success" @click="modifyDiscount">Cập nhật</button>
                </div>
              </div>
            </v-tab>
          </vue-tabs>
        </div>
        
      </div>
    </section>
  </div>
</template>

<script>
import Factory from '@/repositories/RepositoryFactory'
import { LocalStorageSetting } from '@/settings'
import { VueTabs, VTab } from 'vue-nav-tabs/dist/vue-tabs.min.js'

const SettingR = Factory.get('setting')

const KEY_SETTING = LocalStorageSetting.KEY_SETTING // node root in localStorage
const KEY_RANK_MEMBER = LocalStorageSetting.KEY_RANK_MEMBER
const KEY_HAS_POINT = LocalStorageSetting.KEY_HAS_POINT
const KEY_HAS_DISCOUNT = LocalStorageSetting.KEY_HAS_DISCOUNT

export default {
  name: 'SettingsCheckOut',
  components: {
    VueTabs,
    VTab
  },
  data() {
    return {
      item: {},
      option: {},
      lsSetting: {},
      itemRank: {},
      optionRank: {},
      itemPoint: {},
      optionPoint: {},
      itemDiscount: {},
      optionDiscount: {},

      hasRank: true, // Ap dung phan loai thanh vien
      hasPoint: true, // Ap dung Tich/Tieu diem
      hasDiscount: true // Ap dung Chiet khau gio choi
    }
  },
  computed: {
    optionJson() {
      return JSON.stringify(this.option) // convert object to string
    },
    optionRankJson() {
      return JSON.stringify(this.optionRank) // convert object to string
    },
    optionPointJson() {
      return JSON.stringify(this.optionPoint) // convert object to string
    },
    optionDiscountJson() {
      return JSON.stringify(this.optionDiscount) // convert object to string
    }
  },
  async created() {
    await Promise.all([
      this.findKeyRank(),
      this.findKeyPoint(),
      this.findKeyDiscount()
    ])

    try {
      const settings = JSON.parse(window.localStorage.getItem(KEY_SETTING) || 'null')
      this.lsSetting = settings || {}

      let lsOption = null
      // read data from localStorage
      if (this.lsSetting[KEY_RANK_MEMBER]) {
        lsOption = JSON.parse(this.lsSetting[KEY_RANK_MEMBER].option || 'null')
        this.hasRank = lsOption.status
      }
      if (this.lsSetting[KEY_HAS_POINT]) {
        lsOption = JSON.parse(this.lsSetting[KEY_HAS_POINT].option || 'null')
        this.hasPoint = lsOption.status
      }
      if (this.lsSetting[KEY_HAS_DISCOUNT]) {
        lsOption = JSON.parse(this.lsSetting[KEY_HAS_DISCOUNT].option || 'null')
        this.hasDiscount = lsOption.status
      }
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    modify() {
      if (this.item.id) {
        this.update()
      } else {
        this.insert()
      }
    },
    modifyRank() {
      this.itemRank.name = KEY_RANK_MEMBER
      this.item = this.itemRank
      this.optionRank.status = this.hasRank
      this.option = this.optionRank
      this.modify()
      this.lsSetting[KEY_RANK_MEMBER] = this.item
      this.saveLocalStorage()
    },
    modifyPoint() {
      this.itemPoint.name = KEY_HAS_POINT
      this.item = this.itemPoint
      this.optionPoint.status = this.hasPoint
      this.option = this.optionPoint
      this.modify()
      this.lsSetting[KEY_HAS_POINT] = this.item
      this.saveLocalStorage()
    },
    modifyDiscount() {
      this.itemDiscount.name = KEY_HAS_DISCOUNT
      this.item = this.itemDiscount
      this.optionDiscount.status = this.hasDiscount
      this.option = this.optionDiscount
      this.modify()
      this.lsSetting[KEY_HAS_DISCOUNT] = this.item
      this.saveLocalStorage()
    },
    async insert() {
      let type = 'success'
      let msg = ''
      // this.item.name = KEY_COMPANY
      this.item.option = this.optionJson
      const result = await SettingR.create(this.item)
      if (!result.data.success) {
        type = 'error'
        msg = result.data.data.code
      }
      this.showToast(type, msg)
    },
    async update() {
      let type = 'success'
      let msg = ''
      this.item.option = this.optionJson
      const result = await SettingR.update(this.item.id, this.item)
      if (!result.data.success) {
        type = 'error'
        msg = result.data.data.code
      }
      this.showToast(type, msg)
    },
    async findKeyPoint() {
      try {
        const result = await SettingR.getByName(KEY_HAS_POINT)
        if (result.data.data) {
          this.itemPoint = result.data.data
          let option = {}
          try {
            option = JSON.parse(result.data.data.option) // convert string to object
          } catch (e) {
            console.error(e)
          }

          this.optionPoint = option
        }
      } catch (err) {
        console.error(err)
      }
    },
    async findKeyRank() {
      try {
        const result = await SettingR.getByName(KEY_RANK_MEMBER)
        if (result.data.data) {
          this.itemRank = result.data.data
          let option = {}
          try {
            option = JSON.parse(result.data.data.option) // convert string to object
          } catch (e) {
            console.error(e)
          }

          this.optionRank = option
        }
      } catch (err) {
        console.error(err)
      }
    },
    async findKeyDiscount() {
      try {
        const result = await SettingR.getByName(KEY_HAS_DISCOUNT)
        if (result.data.data) {
          this.itemDiscount = result.data.data
          let option = {}
          try {
            option = JSON.parse(result.data.data.option) // convert string to object
          } catch (e) {
            console.error(e)
          }

          this.optionDiscount = option
        }
      } catch (err) {
        console.error(err)
      }
    },
    changeRank() {

    },
    saveLocalStorage() {
      window.localStorage.setItem(KEY_SETTING, JSON.stringify(this.lsSetting))
    },
    showToast(type = 'success', message = '') {
      this.$swal({
        type: type,
        title: message || `${this.item.id ? 'Cập nhật' : 'Thêm mới'} thành công`,
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
.datetime-picker input {
  height: 4em !important;
}
.margin_top {
  margin-top: 15px;
}
div input[type="number"] {
  padding-left: 5px;
}
</style>
