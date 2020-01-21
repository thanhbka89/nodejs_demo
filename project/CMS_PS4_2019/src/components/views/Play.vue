<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <ps4-detail v-if="showModal" :transaction="showModal">
            <h3 slot="header" class="modal-title">
              Chi tiết Máy số {{ currentPS.id }}
            </h3>

            <div slot="body">
              <div class="row z-bottom">
                <div class="col-sm-4"><strong>Bắt đầu: </strong> {{ currentPS.start_hour }}</div>
                <div class="col-sm-8"><strong>Số giờ đã chơi: </strong> {{ currentPS.play_hour }} ({{ currentPS.elapsed }} phút)</div>
              </div>
              <div class="row z-bottom">
                <div class="col-sm-4">
                  <strong>Danh sách dịch vụ:</strong>
                </div>
                <div class="col-sm-5">
                  <v-select v-model="selectedDV" label="name" :options="options"></v-select>
                </div>
              <div class="col-sm-3">
                <button type="button" class="btn btn-success" @click="addService(currentPS.id, selectedDV)"> Thêm dịch vụ </button>
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
                    <tr v-for="(item, index) in currentPS.items" :key="index">
                      <td class="col-xs-1">{{++index}}</td>
                      <td class="col-xs-5">{{item.name.name}}</td>
                      <td class="col-xs-3">
                        <input type="number" id="number" v-model="item.quantity" @change="updateService(currentPS.id, true)" value="1" min="1"/>
                      </td>
                      <td class="col-xs-3">
                        <a href="#" class="icon" data-toggle="tooltip" title="Xóa dịch vụ"><i @click="deleteService(currentPS.id, --index)" class="fa fa-trash"></i></a>
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
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateService(currentPS.id)"> Cập nhật </button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose(currentPS.id)"> Thanh toán </button>
            </div>
        </ps4-detail>
      </div>

       <div class="col-xs-12">
        <ps4-detail v-if="showChange">
            <h3 slot="header" class="modal-title">
              Thực hiện chuyển Máy số {{ currentPS.id }}
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
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="showAlertConfirm(currentPS.id)"> Cập nhật </button>
            </div>
        </ps4-detail>
      </div>

      <template v-for="(code, index) in codesPS">
        <div class="clearfix" :key="`${code}-${index}`"></div>
        <div class="col-xs-12" :key="`${code}_${index}`">
          <h3>
            Danh sách máy {{ code }}
          </h3>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12"
        v-for="item in filterPS(code)" :key="'ps_' + item.id">
        <ps4-box
          :icon-classes="['ion', 'ion-ios-game-controller-b-outline']"
          :id-ps="item.id"
          :text="item.name"
          :code="item.code"
          :number="item.code + '_' + item.id"
          :ps4-start="togglePs4(item.code + '_' + item.id)"
          :openModal="openModal"
          :openModalChange="openModalChange"
          @created="handleCreate">
        </ps4-box>
      </div>
      </template>     

    </div>
  </section>
</template>

<script>
import api from '@/api'
import Ps4Box from '@/components/widgets/Ps4Box'
import Ps4Detail from '@/components/widgets/Modal'
import moment from 'moment'

export default {
  name: 'PlayPS',
  data() {
    return {
      showModal: false,
      showChange: false,
      listPS4: [],
      getPs4: {},
      selectedDV: '',
      options: [], // list Dich vu
      lsListOff: 'listPSOff', // name localStorage
      selectedPS: '',
      psOff: [], // list may dang khong co nguoi choi
      codesPS: [] // loai may PS
    }
  },
  computed: {
    currentPS() {
      return this.getPs4
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
      let ps = typeof val === 'object' ? val : {}
      if (ps != null) {
        const {start} = ps
        let elapsed = moment().diff(start, 'minutes')
        ps.elapsed = elapsed
        ps.play_hour = Math.floor(elapsed / 60) + ':' + elapsed % 60 // moment.utc().startOf('day').add({ minutes: elapsed }).format('H:mm')

        this.getPs4 = ps
        window.localStorage.setItem(ps.id, JSON.stringify(ps))

        // write db
        this.postPSPlaying(ps)
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
      let ps = null
      if (this.togglePs4(id)) {
        this.showModal = showModal
        ps = this.getPs4
        window.localStorage.setItem(ps.id, JSON.stringify(ps))
        this.showToast()
      }
    },
    togglePs4(id = 1) {
      return !!(window.localStorage.getItem(id) || false)
    },
    addService(id, val) {
      if (this.togglePs4(id) && val) {
        this.selectedDV = ''
        let ps = JSON.parse(window.localStorage.getItem(id))
        let items = ps.items || []
        let index = items.length

        // tim kiem xem dich vu nay da them chua
        const idxFound = items.findIndex((element) => {
          return element.name.id === val.id
        })
        if (idxFound >= 0) {
          let parsed = parseInt(items[idxFound].quantity)
          if (!isNaN(parsed)) {
            items[idxFound].quantity = parsed + 1
          }
        } else {
          items.push({id: ++index, name: val, quantity: 1, start: ps.end})
        }
        ps.items = items
        this.getPs4 = ps
        window.localStorage.setItem(ps.id, JSON.stringify(ps))
      }
    },
    changePS(id, val) {
      if (this.togglePs4(id) && val) {
        this.selectedPS = null
        const oldPS = JSON.parse(window.localStorage.getItem(id)) // may ban dau
        let ps = JSON.parse(window.localStorage.getItem(id))
        // update thong tin sang may can chuyen
        ps.id = `${val.code}_${val.id}`
        ps.code = val.code
        ps.id_ps = val.id
        ps.name = val.name
        ps.origin = oldPS.id_ps
        this.getPs4 = ps
        window.localStorage.setItem(ps.id, JSON.stringify(ps))
        window.localStorage.removeItem(oldPS.id) // Xoa may cu

        // update list ps off
        let listPSOff = this.psOff
        listPSOff.push({
          id: oldPS.id_ps, code: oldPS.code, name: oldPS.name
        })
        const filtered = listPSOff.filter(function(item, index, arr) {
          return item.id !== val.id
        })
        this.psOff = filtered
        window.localStorage.setItem(this.lsListOff, JSON.stringify(filtered))

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
        // get list PS active
        const result = await api.request('get', '/ps/p/1?limit=1000&status=1')
        if (result.data.success) {
          this.listPS4 = result.data.data

          // get list codes PS
          let codes = []
          result.data.data.forEach(e => codes.push(e.code))
          this.codesPS = [...new Set(codes)].sort() // mang unique
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
    filterPS(code) {
      return this.listPS4.filter((item) => item.code === code)
    },
    async postPSPlaying(ps = {}) {
      let playing = {
        id_ps: ps.id_ps,
        code: ps.code,
        key: ps.id,
        content: JSON.stringify(ps)
      }
      try {
        const result = await api.request('get', `/ps/playing/p/1?limit=1&id_ps=${ps.id_ps}`)
        if (result.data.data.length) { // update
          const psUpdated = result.data.data[0]
          psUpdated.content = JSON.stringify(ps)
          await api.request('put', `/ps/playing/action/${psUpdated.id}`, psUpdated)
        } else { // create
          await api.request('post', '/ps/playing/create', playing)
        }
      } catch (e) {
        console.error(e)
      }
    },
    showAlertConfirm() {
      this.showChange = false
      let psOrigin = this.getPs4
      let psDes = this.selectedPS
      let msg = ''
      if (psDes) {
        // check code cua 2 may xem giong hay khac nhau ?
        if (psOrigin.code !== psDes.code) {
          msg = `${psOrigin.name} khác loại với ${psDes.name}, nếu bạn vẫn muốn chuyển máy thì có thể sai giá khi tính tiền!`
        }
        this.$swal({
          title: 'Bạn có chắc?',
          text: `Bạn có muốn thực hiện chuyển máy? ${msg}`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Đồng ý'
        }).then((result) => {
          if (result.value) {
            this.changePS(psOrigin.id, psDes)
          } else {
            this.showChange = true
          }
        })
      } else {
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

