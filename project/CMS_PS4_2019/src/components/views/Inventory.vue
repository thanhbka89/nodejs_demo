<template>
  <section class="content">
    <div class="row">
      <service-create v-if="showModal">
        <h3 slot="header" class="modal-title">
          {{item.id ? 'Cập nhật' : 'Thêm mới'}}
        </h3>
        <div slot="body" class="form-horizontal box-body">
          <div class="form-group">
              <label class="col-sm-3 z-label">Mã dịch vụ:</label>
              <div class="col-sm-9">
                <!-- <input type="text" class="form-control" v-model="item.code" placeholder="Mã code ..."/> -->
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
              <input type="text" class="form-control" v-model="item.gia_nhap"/>
              </div>
          </div>
          <div class="form-group">
							<label class="col-sm-3 z-label">Số lượng:</label>
              <div class="col-sm-9">
							<input type="text" class="form-control" v-model="item.quantity"/>
              </div>
					</div>
          <div class="form-group">
							<label class="col-sm-3 z-label">Danh mục:</label>
              <div class="col-sm-9">
                <select class="form-control" v-model="item.category">
                  <option value="1">Nước uống</option>
                  <option value="2">Đồ ăn</option>
                  <option value="3">PS</option>
                  <option value="4">Khác</option>
                </select>
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
        <index :openModal="openModal" :codes="options"></index>
      </div>
      
    </div>
  </section>
</template>

<script>
import api from '@/api'
import Index from '@/components/widgets/inventory/Index'
import ServiceCreate from '@/components/widgets/Modal'

export default {
  name: 'Inventory',
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
      // get value code from v-select
      let objCode = this.item.code
      this.item.code = objCode.code
      api
        .request('post', '/inventory', this.item)
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
        .request('put', `/inventory/${this.item.id}`, this.item)
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
        const result = await api.request('get', '/code/p/1?limit=100&status=1')
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
