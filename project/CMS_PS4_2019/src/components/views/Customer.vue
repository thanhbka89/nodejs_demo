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
        <button type="button" class="btn btn-primary" @click="openModal('thanhnm')">Open Modal</button>
        <button type="button" class="btn btn-primary" @click="forceRerender()">Re-render Component</button>
        <button type="button" class="btn btn-primary" @click="showAlert()">Alert</button>
        <button type="button" class="btn btn-primary" @click="showAlertConfirm()">Confirm</button>
         <button type="button" class="btn btn-primary" @click="showToast()">Toast</button>
      </div>

      <!-- PS4 boxes -->
      <div class="col-md-4 col-sm-6 col-xs-12">
        <ps4-box
          :icon-classes="['ion', 'ion-ios-game-controller-b-outline']"
          text="Máy 1"
          number="ps4_01"
          :ps4-start="togglePs4('ps4_01')"
          :openModal="openModal"
          @created="handleCreate"
        ></ps4-box>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <ps4-box
          :icon-classes="['ion', 'ion-ios-football-outline']"
          text="Máy 2"
          number="ps4_02"
          :ps4-start="togglePs4('ps4_02')"
          :openModal="openModal"
          @created="handleCreate"
          :key="componentKey"
        ></ps4-box>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <ps4-box
          :icon-classes="['ion', 'ion-ios-game-controller-b-outline']"
          text="Máy 3"
          number="ps4_03"
          :ps4-start="togglePs4('ps4_03')"
          :openModal="openModal"
          @created="handleCreate"
        ></ps4-box>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <ps4-box
          :icon-classes="['ion', 'ion-ios-game-controller-b-outline']"
          text="Máy 4"
          number="ps4_04"
          :ps4-start="togglePs4('ps4_04')"
          :openModal="openModal"
          @created="handleCreate"
          :key="componentKey"
        ></ps4-box>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <ps4-box
          :icon-classes="['ion', 'ion-ios-game-controller-b-outline']"
          text="Máy 5"
          number="ps4_05"
          :ps4-start="togglePs4('ps4_05')"
          :openModal="openModal"
          @created="handleCreate"
        ></ps4-box>
      </div>
      <!-- /.col -->
    </div>
  </section>
</template>

<script>
import api from '../../api'
import Ps4Box from '../widgets/PS4Box'
import Ps4Detail from '../widgets/Modal'
import moment from 'moment'
// https://github.com/waseembarcha/vuejs-crud/blob/master/src/components/Products.vue

export default {
  name: 'Customer',
  data() {
    return {
      showModal: false,
      listPS4: [],
      componentKey: 0,
      getPs4: {},
      selectedDV: '',
      options: []
    }
  },
  created() {
    this.getActiveServices()
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
    submitAndClose(pNumber = 1) {
      let result = confirm('Bạn có muốn thực hiện thanh toán ?')
      if (result === true) {
        let route = {
          name: 'CheckOut',
          params: { id: pNumber },
          query: { plan: 'private' }
        }
        this.$router.push(route)
      }
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
        this.getPs4.items.push({id: ++index, name: val, quantity: 1})
        window.localStorage.setItem(this.getPs4.id, JSON.stringify(this.getPs4))
      }
    },
    deleteService(id, index) {
      if (this.togglePs4(id)) {
        this.getPs4.items.splice(index, 1)
      }
      console.log(this.getPs4)
    },
    getActiveServices() {
      api
        .request('get', '/item/cate_active/1,2,4')
        .then(response => {
          console.log(response)
          this.options = response.data
        })
        .catch(e => {
          console.error(e)
        })
    },
    // ham duoc goi tu component con
    handleCreate(value) {
      console.log('Child has been created.', value)
    },
    forceRerender() {
      this.componentKey += 1
    },
    showAlert() {
      this.$swal('Hello Vue world!!!')
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
    },
    showAlertConfirm() {
      this.$swal({
        title: 'Are you sure?',
        text: 'Bạn có muốn thực hiện thanh toán!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý'
      }).then((result) => {
        if (result.value) {
          this.$swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
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
</style>

