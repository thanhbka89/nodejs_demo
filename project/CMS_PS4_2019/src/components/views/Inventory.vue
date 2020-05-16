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
							<label class="col-sm-3 z-label">Danh mục:</label>
              <div class="col-sm-9">
                <select class="form-control" v-model="item.category">
                  <option v-for="option in categories" v-bind:value="option.value" :key="option.value">
                    {{ option.name }}
                  </option>
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
        <index :openModal="openModal" :codes="options"
          :key="componentKey" @reRender="forceRerender">
        </index>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/api'
import Index from '@/components/widgets/inventory/Index'
import ServiceCreate from '@/components/widgets/Modal'
import { CommonSetting } from '@/settings'

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
      options: [],
      categories: CommonSetting.MASTER_CATEGORY,
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
      if (!this.item.code) {
        this.$showToast({ type: 'warning', message: 'Chọn Mã dịch vụ' })
        return
      }
      let objCode = this.item.code
      this.item.code = objCode.code
      api
        .request('post', '/inventory', this.item)
        .then(response => {
          let type = 'warning'
          let message = response.data.data.code
          if (response.data.success) {
            type = 'success'
            message = 'Thêm mới thành công!'
            this.closeModal()
            this.forceRerender() // re-render component
            this.$showToast({ type, message })
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
            this.$showToast({ message: 'Cập nhật thành công!' })
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
