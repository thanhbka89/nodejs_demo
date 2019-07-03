<template>
  <section class="content">
    <div class="row">
      <trans-detail v-if="showModal">
        <h3 slot="header" class="modal-title">
          {{item.id ? 'Cập nhật' : 'Thêm mới'}}
        </h3>
        <div slot="body" class="form-horizontal box-body">
          <div class="form-group">
              <label class="col-sm-3 z-label">Mã dịch vụ:</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="item.code" placeholder="Mã code ..."/>
              </div>              
          </div>
          <div class="form-group">
              <label class="col-sm-3 z-label">Tên dịch vụ:</label>
              <div class="col-sm-9">
              <input type="text" class="form-control" v-model="item.name" placeholder="Service name ..."/>
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-3 z-label">Giá nhập:</label>
              <div class="col-sm-9">
              <input type="text" class="form-control" v-model="item.gia_nhap"/>
              </div>
          </div>
          <div class="form-group">
							<label class="col-sm-3 z-label">Giá bán:</label>
              <div class="col-sm-9">
							<input type="text" class="form-control" v-model="item.gia_ban"/>
              </div>
					</div>          
        </div>
        <div slot="footer">
          <button type="button" class="btn btn-outline-info" @click="closeModal()"> Close </button>
          <!-- <button type="button" class="btn btn-success" @click="modify()">Save Changes</button> -->
        </div>
      </trans-detail>
      <div class="col-xs-12">
        <index :openModal="openModal"></index>
      </div>    
    </div>
  </section>
</template>

<script>
import api from '../../api'
import Index from '../widgets/transaction/Index'
import TransDetail from '../widgets/Modal'

export default {
  name: 'Transaction',
  data() {
    return {
      showModal: false,
      item: {
        id: '',
        code: '',
        name: '',
        category: 1,
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
        .request('post', '/item', this.item)
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
      api
        .request('put', `/item/${this.item.id}`, this.item)
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
    TransDetail
  }
}
</script>

<style scoped>
.z-label {
  margin-top: 5px;
}
</style>
