<template>
  <section class="content">
    <div class="row">
      <service-create v-if="showModal">
        <h3 slot="header" class="modal-title">
          {{item.id ? 'Cập nhật' : 'Thêm mới'}}
        </h3>
        <div slot="body" class="form-horizontal box-body">
          <div class="form-group">
              <label class="col-sm-3 z-label">Mã code:</label>
              <div class="col-sm-9">
                <!-- <input type="text" class="form-control" v-model="item.code" placeholder="Mã code ..."/> -->
                <v-select v-model="item.code" label="name" :options="options"></v-select>
              </div>              
          </div>
          <div class="form-group">
              <label class="col-sm-3 z-label">Tên máy:</label>
              <div class="col-sm-9">
              <input type="text" class="form-control" v-model="item.name" placeholder="Tên giao dịch ..."/>
              </div>
          </div>
          <div class="form-group">
							<label class="col-sm-3 z-label">Trạng thái:</label>
              <div class="col-sm-9">
                <select class="form-control" v-model="item.status">
                  <option value="1">Áp dụng</option>
                  <option value="0">Không áp dụng</option>
                </select>                
              </div>
					</div>
        </div>
        <div slot="footer">
          <button type="button" class="btn btn-outline-info" @click="closeModal()"> Close </button>
          <button type="button" class="btn btn-success" @click="modify()">Save Changes</button>
        </div>
      </service-create>
      <div class="col-xs-12">
        <index :openModal="openModal"></index>
      </div>
      
    </div>
  </section>
</template>

<script>
import api from '../../api'
import Index from '../widgets/ps/Index'
import ServiceCreate from '../widgets/Modal'

export default {
  name: 'ListPS',
  data() {
    return {
      showModal: false,
      item: {
        id: '',
        code: '',
        name: '',
        category: 1,
        status: 1
      },
      options: []
    }
  },
  created() {
    this.getActiveCodes()
  },
  methods: {
    openModal(obj = this.item) {
      this.item = obj
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    modify() {
      if (this.item.id) {
        this.update()
      } else {
        this.insert()
      }
    },
    insert() {
      // get value code from v-select
      let objCode = this.item.code
      this.item.code = objCode.code
      api
        .request('post', '/ps', this.item)
        .then(response => {
          if (response.data.success) {
            this.closeModal()
            this.showToast()
          } else {
            this.showToast('warning', response.data.message.code)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    update() {
      if (typeof this.item.code === 'object' && this.item.code !== null) {
        let objCode = this.item.code
        this.item.code = objCode.code
      }
      api
        .request('put', `/ps/${this.item.id}`, this.item)
        .then(response => {
          if (response.data) {
            this.closeModal()
            this.showToast()
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    async getActiveCodes() {
      try {
        // get codes for PS
        const result = await api.request('get', '/code/p/1?limit=100&status=1&category=3')
        if (result.data.success) {
          this.options = result.data.data
        }
      } catch (e) {
        console.error(e)
      }
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
  },
  components: {
    Index,
    ServiceCreate
  }
}
</script>

<style scoped>
.z-label {
  margin-top: 5px;
}
</style>
