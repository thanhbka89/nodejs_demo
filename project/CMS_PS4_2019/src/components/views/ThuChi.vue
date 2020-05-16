<template>
  <section class="content">
    <div class="row">
      <service-create v-if="showModal">
        <h3 slot="header" class="modal-title">
          {{item.id ? 'Cập nhật' : 'Thêm mới'}}
        </h3>
        <div slot="body" class="form-horizontal box-body">
          <div class="form-group">
							<label class="col-sm-3 z-label">Loại Thu/Chi:</label>
              <div class="col-sm-9">
                <select class="form-control" v-model="item.type">
                  <option value="1">Chi</option>
                  <option value="2">Thu</option>
                </select>
              </div>
					</div>
          <div class="form-group">
              <label class="col-sm-3 z-label">Mã dịch vụ:</label>
              <div class="col-sm-9">
                <v-select v-model="item.code" label="name" :options="options"></v-select>
              </div>              
          </div>
          <div class="form-group">
              <label class="col-sm-3 z-label">Tên giao dịch:</label>
              <div class="col-sm-9">
              <input type="text" class="form-control" v-model="item.name" placeholder="Tên giao dịch ..."/>
              </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 z-label">Giá nhập:</label>
            <div class="col-sm-9">
              <money class="form-control" v-model="item.gia_nhap"></money>
            </div>
          </div>
          <div class="form-group">
							<label class="col-sm-3 z-label">Số lượng:</label>
              <div class="col-sm-9">
							<input type="text" class="form-control" v-model="item.quantity"/>
              </div>
					</div>
          <div class="form-group">
            <label class="col-sm-3 z-label">Ghi chú:</label>
            <div class="col-sm-9">
              <textarea class="form-control" v-model="item.description"></textarea>
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
        <index :openModal="openModal" :codes="options" :key="componentKey" @reRender="forceRerender"></index>
      </div>
      
    </div>
  </section>
</template>

<script>
import api from '@/api'
import Index from '@/components/widgets/thuchi/Index'
import ServiceCreate from '@/components/widgets/Modal'

export default {
  name: 'ThuChi',
  data() {
    return {
      showModal: false,
      item: {
        id: '',
        code: '',
        name: '',
        status: 1
      },
      options: [],
      componentKey: 0 // re-render a component
    }
  },
  async created() {
    await this.getActiveCodes()
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
      // validate data before post
      // let valid = true
      let errMsg = ''
      if (!this.item.code) {
        errMsg = 'Nhập Mã dịch vụ'
      }
      if (!this.item.type) {
        errMsg = 'Nhập Loại Thu/Chi'
      }
      if (!this.item.name) {
        errMsg = 'Nhập Tên giao dịch'
      }
      if (errMsg) { // Co loi validate
        this.$showToast({ type: 'warning', message: errMsg })

        return
      }

      // get value code from v-select
      let objCode = this.item.code
      this.item.code = objCode.code
      this.item.quantity = this.item.quantity || 0
      api
        .request('post', '/thuchi', this.item)
        .then(response => {
          let message = 'Có lỗi xảy ra'
          let type = 'warning'
          if (response.data.success) {
            type = 'success'
            message = 'Thêm mới thành công!'
            this.closeModal()
          }
          this.forceRerender() // re-render component
          this.$showToast({ type, message })
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
        .request('put', `/thuchi/${this.item.id}`, this.item)
        .then(response => {
          let message = 'Có lỗi xảy ra'
          let type = 'warning'
          if (response.data.success) {
            type = 'success'
            message = 'Cập nhật thành công!'
            this.closeModal()
          }
          this.$showToast({ type, message })
        })
        .catch(e => {
          console.error(e)
        })
    },
    async getActiveCodes() {
      try {
        const result = await api.request('get', '/code/category/4?limit=100&status=1')
        if (result.data.success) {
          this.options = result.data.data
        }
      } catch (e) {
        console.error(e)
      }
    },
    forceRerender() {
      this.componentKey += 1
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
