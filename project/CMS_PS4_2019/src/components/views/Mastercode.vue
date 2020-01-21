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
              <input type="text" class="form-control" v-model="item.code" placeholder="Mã code ..." :disabled="item.id" />
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
                <option v-for="option in options" v-bind:value="option.value" :key="option.value">
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
        <index :openModal="openModal" :optionsCategory="options"></index>
      </div>
      
    </div>
  </section>
</template>

<script>
import api from '@/api'
import Index from '@/components/widgets/mastercode/Index'
import ServiceCreate from '@/components/widgets/Modal'
import Factory from '@/repositories/RepositoryFactory'
import { CommonSetting } from '@/settings'

const CodeR = Factory.get('code')

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
      },
      options: CommonSetting.MASTER_CATEGORY
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
    async update() {
      let type = 'success'
      let msg = null
      try {
        const result = await CodeR.update(this.item.id, this.item)
        if (!result.data.success) {
          type = 'error'
          msg = result.data.data.code
        }
        this.closeModal()
        this.showToast(type, msg)
      } catch (err) {
        console.error(err)
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
