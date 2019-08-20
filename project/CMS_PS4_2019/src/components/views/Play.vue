<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <ps4-detail v-if="showModal" :transaction="showModal">
            <h3 slot="header" class="modal-title">
              Chi tiết Máy số {{getPs4.id}}
            </h3>

            <div slot="body">
              <div class="row z-bottom">
                <div class="col-sm-4"><strong>Bắt đầu: </strong> {{getPs4.start_hour}}</div>
                <div class="col-sm-8"><strong>Số giờ đã chơi: </strong> {{getPs4.play_hour}} ({{getPs4.elapsed}} phút)</div>
              </div>
              <div class="row z-bottom">
                <div class="col-sm-4">
                  <strong>Danh sách dịch vụ:</strong>
                </div>
                <div class="col-sm-5">
                  <v-select v-model="selectedDV" label="name" :options="options"></v-select>
                </div>
              <div class="col-sm-3">
                <button type="button" class="btn btn-success" @click="addService(getPs4.id, selectedDV)"> Thêm dịch vụ </button>
              </div>
              </div>
               <div class="row">
                 <div class="col-xs-12">
                   <div class="box">
                     <div class="box-body table-responsive no-padding">
                       <table class="table table-hover">
                        <thead>
                          <tr>
                            <th>Stt</th>
                            <th>Mặt hàng</th>
                            <th>Số lượng</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in getPs4.items" :key="index">
                          <td class="col-xs-1">{{++index}}</td>
                          <td class="col-xs-5">{{item.name.name}}</td>
                          <td class="col-xs-3">
                            <input type="number" id="number" v-model="item.quantity" @change="updateService(getPs4.id, true)" value="1" min="1"/>
                          </td>
                          <td class="col-xs-3">
                            <a href="#" class="icon" data-toggle="tooltip" title="Xóa dịch vụ"><i @click="deleteService(getPs4.id, --index)" class="fa fa-trash"></i></a>          
                          </td>
                        </tr>
                      </tbody>
                      </table>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
                
            <div slot="footer">
                <button type="button" class="btn btn-outline-info" @click="closeModal()"> Đóng </button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateService(getPs4.id)"> Cập nhật </button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose(getPs4.id)"> Thanh toán </button>
            </div>
        </ps4-detail>
      </div>

       <div class="col-xs-12">
        <ps4-detail v-if="showChange">
            <h3 slot="header" class="modal-title">
              Thực hiện chuyển Máy số {{getPs4.id}}
            </h3>

            <div slot="body">
              <div class="row z-bottom mb-change">
                <div class="col-sm-5">
                  <strong>Chuyển sang máy:</strong>
                </div>
                <div class="col-sm-7">
                  <v-select v-model="selectedPS" label="name" :options="psOff"></v-select>
                </div>
              </div>
             </div>
                
            <div slot="footer">
                <button type="button" class="btn btn-outline-info" @click="closeModalChange()"> Đóng </button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="showAlertConfirm(getPs4.id)"> Cập nhật </button>
            </div>
        </ps4-detail>
      </div>
      <hr />
      <div class="col-md-4 col-sm-6 col-xs-12" 
        v-for="item in listPS4" :key="item.id">
        <ps4-box
          :icon-classes="['ion', 'ion-ios-game-controller-b-outline']"
          :id-ps="item.id"
          :text="item.name"
          :code="item.code"
          :number="item.code + '_' + item.id"
          :ps4-start="togglePs4(item.code + '_' + item.id)"
          :openModal="openModal"
          :openModalChange="openModalChange"
          @created="handleCreate"
        ></ps4-box>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/api'
import Ps4Box from '../widgets/PS4Box'
import Ps4Detail from '../widgets/Modal'
import moment from 'moment'
// https://github.com/waseembarcha/vuejs-crud/blob/master/src/components/Products.vue

export default {
  name: 'PlayPS',
  data() {
    return {
      showModal: false,
      showChange: false,
      listPS4: [],
      componentKey: 0,
      getPs4: {},
      selectedDV: '',
      options: [],
      lsListOff: 'listPSOff',
      selectedPS: '',
      psOff: []
    }
  },
  async created() {
    await this.getListPS4()
    this.getActiveServices()
    this.setListOff()
  },
  methods: {
    openModal(val = 'Open') {
      console.log('Call OPEN Parent')
      this.getPs4 = typeof val === 'object' ? val : {}
      if (this.getPs4 != null) {
        const {start} = this.getPs4
        let elapsed = moment().diff(start, 'minutes')
        this.getPs4.elapsed = elapsed
        this.getPs4.play_hour = Math.floor(elapsed / 60) + ':' + elapsed % 60 // moment.utc().startOf('day').add({ minutes: elapsed }).format('H:mm')
        window.localStorage.setItem(this.getPs4.id, JSON.stringify(this.getPs4))
      }
      this.showModal = true
    },
    closeModal() {
      console.log('Call CLOSE Parent')
      this.showModal = false
    },
    openModalChange(val = 'Open') {
      this.getPs4 = typeof val === 'object' ? val : {}
      this.showChange = true
    },
    closeModalChange() {
      this.showChange = false
    },
    submitAndClose(pNumber = 1) {
      let route = {
        name: 'CheckOut',
        params: { id: pNumber },
        query: { command: 'checkout' }
      }
      this.$router.push(route)
    },
    updateService(id = 1, showModal = false) {
      if (this.togglePs4(id)) {
        this.showModal = showModal
        window.localStorage.setItem(this.getPs4.id, JSON.stringify(this.getPs4))
        this.showToast()
      }
    },
    togglePs4(id = 1) {
      return !!(window.localStorage.getItem(id) || false)
    },
    addService(id, val) {
      if (this.togglePs4(id) && val) {
        this.selectedDV = ''
        this.getPs4 = JSON.parse(window.localStorage.getItem(id))
        this.getPs4.items = this.getPs4.items || []
        let index = this.getPs4.items.length

        // tim kiem xem dich vu nay da them chua
        const idxFound = this.getPs4.items.findIndex((element) => {
          return element.name.id === val.id
        })
        if (idxFound >= 0) {
          let parsed = parseInt(this.getPs4.items[idxFound].quantity)
          if (!isNaN(parsed)) {
            this.getPs4.items[idxFound].quantity = parsed + 1
          }
        } else {
          this.getPs4.items.push({id: ++index, name: val, quantity: 1, start: this.getPs4.end})
        }
        window.localStorage.setItem(this.getPs4.id, JSON.stringify(this.getPs4))
      }
    },
    changePS(id, val) {
      if (this.togglePs4(id) && val) {
        this.selectedPS = null
        const oldPS = JSON.parse(window.localStorage.getItem(id)) // may ban dau
        this.getPs4 = JSON.parse(window.localStorage.getItem(id))
        // update thong tin sang may can chuyen
        this.getPs4.id = `${val.code}_${val.id}`
        this.getPs4.code = val.code
        this.getPs4.id_ps = val.id
        this.getPs4.name = val.name
        this.getPs4.origin = oldPS.id_ps
        window.localStorage.setItem(this.getPs4.id, JSON.stringify(this.getPs4))
        window.localStorage.removeItem(oldPS.id) // Xoa may cu
        // update list ps off
        this.psOff.push({
          id: oldPS.id_ps, code: oldPS.code, name: oldPS.name
        })
        const filtered = this.psOff.filter(function(item, index, arr) {
          return item.id !== val.id
        })
        this.psOff = filtered
        window.localStorage.setItem(this.lsListOff, JSON.stringify(this.psOff))

        this.$router.go() // reload page
      }
    },
    deleteService(id, index) {
      if (this.togglePs4(id)) {
        this.getPs4.items.splice(index, 1)
      }
    },
    getActiveServices() {
      api
        .request('get', '/item/cate_active/1,2,4')
        .then(response => {
          this.options = response.data
        })
        .catch(e => {
          console.error(e)
        })
    },
    async getListPS4() {
      try {
        // get list ps4 active
        const result = await api.request('get', '/ps/p/1?limit=100&status=1&code=PS4')
        if (result.data.success) {
          this.listPS4 = result.data.data
        }
      } catch (e) {
        console.error(e)
      }
    },
    setListOff() {
      let listOff = this.listPS4.filter(item => {
        return !(window.localStorage.getItem(`${item.code}_${item.id}`) || false)
      })
      this.psOff = listOff
      window.localStorage.setItem(this.lsListOff, JSON.stringify(listOff))
    },
    // ham duoc goi tu component con
    handleCreate(value) {
      console.log('Child has been created.', value)
    },
    forceRerender() {
      this.componentKey += 1
    },
    showAlertConfirm() {
      this.showChange = false
      if (this.selectedPS) {
        this.$swal({
          title: 'Bạn có chắc?',
          text: 'Bạn có muốn thực hiện chuyển máy?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Đồng ý'
        }).then((result) => {
          if (result.value) {
            this.changePS(this.getPs4.id, this.selectedPS)
          } else {
            this.showChange = true
          }
        })
      } else {
        // this.showAlertMember()
        this.showChange = true
      }
    },
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
    Ps4Box,
    Ps4Detail
  }
}
</script>

<style scoped>
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
#number {
  width: 50px;
  padding-left: 5px;
}
.z-bottom {
  margin-bottom: 5px;
}
.mb-change {
  height: 200px;
}
</style>

