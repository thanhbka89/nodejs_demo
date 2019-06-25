<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <h2>List customers</h2>
        <ps4-detail v-if="showModal" :transaction="showModal">
            <h3 slot="header" class="modal-title">
              Chi tiết {{getPs4.id}}
            </h3>

             <div slot="body">
               <p>Máy số: {{getPs4.id}}</p>
               <p>{{getPs4.origin}}</p>
               <p>Bắt đầu (hh:mm): {{getPs4.start_hour}}</p>
               <p>Số giờ đã chơi (hh:mm): {{getPs4.play_hour}} ({{getPs4.elapsed}} phút)</p>
               <p>Danh sách dịch vụ:</p>
             </div>
                
            <div slot="footer">
                <button type="button" class="btn btn-outline-info" @click="closeModal()"> Close </button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose()"> Update </button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose(getPs4.id)"> Checkout </button>
            </div>
        </ps4-detail>
        <button type="button" class="btn btn-primary" @click="openModal('thanhnm')">Open Modal</button>
        <button type="button" class="btn btn-primary" @click="forceRerender()">Re-render Component</button>
        <button type="button" class="btn btn-primary" @click="showAlert()">Alert</button>
        <button type="button" class="btn btn-primary" @click="showAlertConfirm()">Confirm</button>
         <button type="button" class="btn btn-primary" @click="showToast()">Toast</button>
      </div>

      <!-- PS4 boxes -->
      <div class="col-md-4 col-sm-6 col-xs-12">
        <ps4-box
          :icon-classes="['ion', 'ion-ios-game-controller-a-outline']"
          text="Máy 1"
          number="ps4_01"
          :openModal="openModal"
          @created="handleCreate"
          :key="componentKey"
        ></ps4-box>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <ps4-box
          :icon-classes="['ion', 'ion-ios-football-outline']"
          text="Máy 2"
          number="ps4_02"
          :ps4-start="true"
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
          :ps4-start="true"
          :openModal="openModal"
          @created="handleCreate"
        ></ps4-box>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <ps4-box
          :icon-classes="['ion', 'ion-ios-game-controller-b-outline']"
          text="Máy 4"
          number="ps4_04"
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
          :openModal="openModal"
          @created="handleCreate"
        ></ps4-box>
      </div>
      <!-- /.col -->
    </div>
  </section>
</template>

<script>
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
      getPs4: {}
    }
  },
  methods: {
    openModal(val = 'Open') {
      console.log('Call OPEN Parent')
      debugger
      this.getPs4 = typeof val === 'object' ? val : {}
      const {start} = this.getPs4
      let elapsed = moment().diff(start, 'minutes')
      this.getPs4.elapsed = elapsed
      this.getPs4.play_hour = moment.utc().startOf('day').add({ minutes: elapsed }).format('H:mm')
      window.localStorage.setItem(this.getPs4.id, JSON.stringify(this.getPs4))
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
        title: 'Signed in successfully',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
    },
    showAlertConfirm() {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
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
</style>

