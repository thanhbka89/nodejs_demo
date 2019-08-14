<template>
  <section class="content">
    <div class="row">
      <user-create v-if="showModal">
        <h3 slot="header" class="modal-title">
          {{item.id ? 'Cập nhật' : 'Thêm mới'}}
        </h3>
        <div slot="body" class="form-horizontal box-body">
          <div class="form-group">
              <label class="col-sm-3 z-label">Username:</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="item.username" placeholder="username ..." :disabled="item.id"/>
              </div>              
          </div>
          <div class="form-group" v-if="is_admin">
              <label class="col-sm-3 z-label">Password:</label>
              <div class="col-sm-9">
              <input type="password" class="form-control" v-model="item.password" placeholder="passwd ..."/>
              </div>
          </div>
          <div class="form-group">
              <label class="col-sm-3 z-label">Họ Tên:</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="item.fullname" placeholder="Họ và tên ..."/>
              </div>              
          </div>
          <div class="form-group">
              <label class="col-sm-3 z-label">Bí danh:</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="item.nickname" placeholder="Tên nick name ..."/>
              </div>              
          </div>
          <div class="form-group">
              <label class="col-sm-3 z-label">Điện thoại:</label>
              <div class="col-sm-9">
              <input type="text" class="form-control" v-model="item.phone"/>
              </div>
          </div>
          <div class="form-group">
							<label class="col-sm-3 z-label">Địa chỉ:</label>
              <div class="col-sm-9">
							<textarea class="form-control" v-model="item.address"></textarea>
              </div>
					</div>
          <div class="form-group">
							<label class="col-sm-3 z-label">Vai trò:</label>
              <div class="col-sm-9">
                <select class="form-control" v-model="item.role">
                  <option value="2">Nhân viên</option>
                  <option value="3">Khách hàng</option>
                </select>
              </div>
					</div>
          <div class="form-group">
							<label class="col-sm-3 z-label">Trạng thái:</label>
              <div class="col-sm-9">
                <select class="form-control" v-model="item.status">
                  <option value="1">Hoạt động</option>
                  <option value="0">Không hoạt động</option>
                </select>                
              </div>
					</div>
        </div>
        <div slot="footer">
          <button type="button" class="btn btn-outline-info" @click="closeModal()"> Close </button>
          <button type="button" class="btn btn-success" @click="modify()">Save Changes</button>
        </div>
      </user-create>
      <div class="col-xs-12">
        <index :openModal="openModal"></index>
      </div>
      
    </div>
  </section>
</template>

<script>
import api from '../../api'
import Index from '../widgets/user/Index'
import UserCreate from '../widgets/Modal'

export default {
  name: 'User',
  data() {
    return {
      showModal: false,
      item: {
        id: '',
        role: 3,
        status: 1
      }
    }
  },
  computed: {
    is_admin() {
      return this.$store.getters.isAdmin
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
        .request('post', '/user/register', this.item)
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
        .request('put', `/user/action/${this.item.id}`, this.item)
        .then(response => {
          if (response.data.success) {
            this.closeModal()
            this.showToast()
          } else {
            this.showToast('error', response.data.data.sqlMessage)
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
    UserCreate
  }
}
</script>

<style scoped>
.z-label {
  margin-top: 5px;
}
</style>
