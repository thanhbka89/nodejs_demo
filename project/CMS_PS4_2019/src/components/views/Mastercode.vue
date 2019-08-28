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
                <input type="text" class="form-control" v-model="item.code" placeholder="Mã code ..."/>
              </div>              
          </div>
          <div class="form-group">
              <label class="col-sm-3 z-label">Tên code:</label>
              <div class="col-sm-9">
              <input type="text" class="form-control" v-model="item.name" placeholder="Code name ..."/>
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
        <index :openModal="openModal"></index>
      </div>
      
    </div>
  </section>
</template>

<script>
import api from '@/api'
import Index from '@/components/widgets/mastercode/Index'
import ServiceCreate from '@/components/widgets/Modal'

export default {
  name: 'Mastercode',
  data() {
    return {
      showModal: false,
      item: {
        id: '',
        code: '',
        name: '',
        status: 1
      }
    }
  },
  created() {
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
      api
        .request('post', '/code', this.item)
        .then(response => {
          if (response.data.success) {
            this.closeModal()
            this.showToast()
          } else {
            this.showToast('warning', response.data.data.code)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    update() {
      api
        .request('put', `/code/${this.item.id}`, this.item)
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
