<template>
  <div class="table-wrapper">
    <div class="table-title">
        <div class="row">
            <div class="col-sm-6">
                <h2>Manage <b>Users</b></h2>
            </div>
            <div class="col-sm-6">
                <a href="#" class="btn btn-success" data-toggle="modal" @click="addItem"><span>Add user</span></a>		
            </div>
        </div>
    </div>   

    <div class="filters row">
        <div class="form-group col-sm-3">
            <input v-model="searchKey" class="form-control" id="search-element" type="text" placeholder="Tìm kiếm user ..." aria-label="Search" @keyup.enter="search"/>
        </div>
    </div>

    <table class="table table-striped table-hover">
      <thead class="z-header">
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Trạng thái</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in filteredResources" :key="item.id">
          <td class="col-md-1">{{ item.id }}</td>
          <td class="col-md-2">{{ item.username }}</td>
          <td class="col-md-3">{{ item.phone }}</td>
          <td class="col-md-2">{{ item.role === 1 ? 'Quản trị viên' : (item.role === 2 ? 'Nhân viên' : 'Khách hàng') }}</td>
          <td class="col-md-2">{{ item.status ? 'Đang hoạt động' : 'Không hoạt động' }}</td>
          <td class="col-md-2">
            <button class="btn btn-primary" @click="editItem(item)">Edit</button>            
            <button class="btn btn-danger" @click="showAlertConfirm(item.id)">Khóa</button>
            <a href="#" class="icon">
                <i v-on:click="showAlert()" class="fa fa-pencil"></i>
            </a>
            <a href="#" class="icon">
                <i @click="showAlert" class="fa fa-trash"></i>
            </a>            
          </td>
        </tr>
      </tbody>
    </table>

    <div class="clearfix">
        <paginate
        v-model="page"
        :page-count="totalPage"
        :margin-pages="2"
        :page-range="5"
        :click-handler="paginateCallback"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :page-link-class="'page-link-item'"
        :prev-class="'prev-item'"
        :prev-link-class="'prev-link-item'"
        :next-class="'next-item'"
        :next-link-class="'next-link-item'"
        :break-view-class="'break-view'"
        :break-view-link-class="'break-view-link'"
        :first-last-button="true"
      ></paginate>
    </div>
  </div>
</template>
<script>
import api from '../../../api'

export default {
  name: 'UserIndex',
  data() {
    return {
      searchKey: '',
      page: 1,
      limit: 10,
      totalPage: 10,
      items: []
    }
  },
  props: {
    openModal: Function
  },
  computed: {
    filteredResources() {
      return this.items
    }
  },
  created: function() {
    this.fetchItems()
    this.paginateCallback()
  },

  methods: {
    paginateCallback(page = 1) {
      let query = this.searchKey
        ? `username=${this.searchKey}`
        : ''
      query = this.limit ? `${query}&limit=${this.limit}` : query
      api
        .request('get', `/user/p/${page}?` + query)
        .then(response => {
          this.items = response.data
        })
        .catch(e => {
          console.error(e)
        })
    },
    async fetchItems() {
      // api
      //   .request('get', '/user/all')
      //   .then(response => {
      //     const number = response.data.length
      //     this.totalPage = number > this.limit
      //       ? Math.ceil(number / this.limit)
      //       : 1
      //   })
      //   .catch(e => {
      //     console.error(e)
      //   })
      try {
        const response = await api.request('get', '/user')
        let number = response.data.data.length
        this.totalPage = number > this.limit
          ? Math.ceil(number / this.limit)
          : 1
      } catch (err) {
        console.error(err)
      }
    },
    addItem() {
      this.openModal({role: 3, status: 1})
    },
    editItem(item) {
      this.openModal(item)
    },
    deleteItem(id) {
      api
        .request('delete', `/user/action/${id}`)
        .then(response => {
          console.log(response)
          if (response.data) {
            this.showToast(1)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    search() {
      api.request('get', `/item/s/query?q=${this.searchKey}`)
        .then(response => {
          this.items = response.data
        })
        .catch(e => {
          console.error(e)
        })
    },
    showAlertConfirm(id) {
      this.$swal({
        title: 'Bạn có chắc?',
        text: 'Bạn có muốn thực hiện khóa user?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý'
      }).then((result) => {
        if (result.value) {
          this.deleteItem(id)
        }
      })
    },
    showAlert() {
      this.$swal('Chức năng đang hoàn thiện')
    },
    showToast(id) {
      this.$swal({
        type: 'success',
        title: `${id ? 'Cập nhật' : 'Thêm mới'} thành công`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }
}
</script>

<style scoped>
.z-header {
    color: #566787
}
.table-wrapper {
    padding: 20px 25px;
    margin: 30px 0;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.table-title {
    padding-bottom: 15px;
    background: #435d7d;
    color: #fff;
    padding: 16px 30px;
    margin: -20px -25px 10px;
    border-radius: 3px 3px 0 0;
}
.table-title .btn {
    color: #fff;
    float: right;
    font-size: 13px;
    min-width: 50px;
    border-radius: 2px;
    border: none;
    outline: none !important;
    margin-left: 10px;
    margin-top: 15px;
}
</style>
