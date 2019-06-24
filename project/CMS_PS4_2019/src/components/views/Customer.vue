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
               <p>Bắt đầu: {{getPs4.start}}</p>
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
      </div>

      <!-- PS4 boxes -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <ps4-box
          :icon-classes="['ion', 'ion-ios-game-controller-a-outline']"
          text="Máy 1"
          number="ps4_01"
          :openModal="openModal"
          @created="handleCreate"
          :key="componentKey"
        ></ps4-box>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
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
      <div class="col-md-3 col-sm-6 col-xs-12">
        <ps4-box
          :icon-classes="['ion', 'ion-ios-game-controller-b-outline']"
          text="Máy 3"
          number="ps4_03"
          :ps4-start="true"
          :openModal="openModal"
          @created="handleCreate"
        ></ps4-box>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <ps4-box
          :icon-classes="['ion', 'ion-ios-game-controller-b-outline']"
          text="Máy 4"
          number="ps4_04"
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
      this.getPs4 = typeof val === 'object' ? val : {}
      this.showModal = true
    },
    closeModal() {
      console.log('Call CLOSE Parent')
      this.showModal = false
    },
    submitAndClose(pNumber = 1) {
      let result = confirm('Bạn có muốn thực hiện thanh toán ?')
      if (result === true) {
        alert(pNumber)
      }
    },
    handleCreate(value) {
      console.log('Child has been created.', value)
    },
    forceRerender() {
      this.componentKey += 1
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

