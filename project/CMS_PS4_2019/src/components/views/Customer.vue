<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <h2>List customers</h2>
        <ps4-detail v-if="showModal">
            <h3 slot="header" class="modal-title">
                Modal title
            </h3>
                
            <div slot="footer">
                <button type="button" class="btn btn-outline-info" @click="closeModal()"> Close </button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose()"> Submit </button>
            </div>
        </ps4-detail>
        <button type="button" class="btn btn-primary" @click="openModal('thanhnm')">Open Modal</button>
      </div>

      <!-- PS4 boxes -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <ps4-box
          color-class="bg-green"
          :icon-classes="['ion', 'ion-ios-game-controller-a-outline']"
          text="Máy 1"
          number="960"
          :openModal="openModal"
          @created="handleCreate"
        ></ps4-box>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <ps4-box
          color-class="bg-green"
          :icon-classes="['ion', 'ion-ios-football-outline']"
          text="Máy 2"
          number="760"
          :openModal="openModal"
          @created="handleCreate"
        ></ps4-box>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <ps4-box
          color-class="bg-green"
          :icon-classes="['ion', 'ion-ios-game-controller-b-outline']"
          text="Máy 3"
          number="760"
          :openModal="openModal"
          @created="handleCreate"
        ></ps4-box>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <ps4-box
          color-class="bg-black"
          :icon-classes="['ion', 'ion-ios-game-controller-b-outline']"
          text="Máy 4"
          number="820"
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
      showModal: false
    }
  },
  methods: {
    openModal(val = 'Open') {
      console.log('Call OPEN Parent')
      console.log(val)
      this.showModal = true
    },
    closeModal() {
      console.log('Call CLOSE Parent')
      this.showModal = false
    },
    submitAndClose() {
      alert('123')
    },
    handleCreate(event, value) {
      console.log('Child has been created.', value)
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

