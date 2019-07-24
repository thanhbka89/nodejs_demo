<template>
  <div class="table-wrapper">
    <div class="table-title">
        <div class="row">
            <div class="col-sm-6">
                <h2>Manage <b>PS</b></h2>
            </div>
            <div class="col-sm-6">
                <a href="#" class="btn btn-success" data-toggle="modal" @click="addItem"><span>Thêm máy</span></a>		
            </div>
        </div>
    </div>   

    <div class="filters row">
        <div class="form-group col-sm-3">
            <input v-model="searchKey" class="form-control" id="search-element" type="text" 
            @keyup.enter="search" placeholder="Tìm kiếm ..." aria-label="Search"
            autocomplete="off"/>
        </div>
    </div>

    <table class="table table-striped table-hover">
      <thead class="z-header">
        <tr>
          <th>ID</th>
          <th>Code</th>
          <th>Name</th>
          <th>Trạng thái</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in filteredResources" :key="item.id">
          <td class="col-md-1">{{ item.id }}</td>
          <td class="col-md-2">{{ item.code }}</td>
          <td class="col-md-2">{{ item.name }}</td>
          <td class="col-md-2">{{ item.status ? 'Đang áp dụng' : 'Không áp dụng' }}</td>
          <td class="col-md-5">
            <button class="btn btn-primary" @click="editItem(item)">Edit</button>            
            <button class="btn btn-danger" @click="confirmDelete(item.id)">Delete</button>
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
  name: 'PSIndex',
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
    async paginateCallback(page = 1) {
      let query = this.build_query()
      try {
        const response = await api.request('get', `/ps/p/${page}` + query)
        this.items = response.data.data
      } catch (err) {
        this.items = []
        console.error(err)
      }
    },
    async fetchItems() {
      try {
        await this.count()
      } catch (err) {
        console.error(err)
      }
    },
    addItem() {
      this.openModal({status: 1})
    },
    editItem(item) {
      this.openModal(item)
    },
    async deleteItem(id) {
      try {
        const result = await api.request('delete', `/ps/${id}`)
        if (result.data.success) {
          this.showToast(id)
        }
      } catch (e) {
        console.error(e)
      }
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
    async count(filter = null) {
      filter = filter || ''
      try {
        const response = await api.request('get', `/ps/get/count${filter}`)
        if (response.data.success) {
          let number = response.data.data
          this.totalPage = number > this.limit
            ? Math.ceil(number / this.limit)
            : 1
        }
      } catch (err) {
        console.error(err)
      }
    },
    build_query() {
      let query = '?'
      if (this.searchKey) {
        query = query.concat(`code=${this.searchKey}`)
      }
      if (this.limit) {
        query = query.concat(`&limit=${this.limit}`)
      }
      // if (this.dateFrom) {
      //   query = query.concat(`&from=${moment(this.dateFrom).format('YYYY-MM-DD')}`)
      // }
      // if (this.dateTo) {
      //   query = query.concat(`&to=${moment(this.dateTo).format('YYYY-MM-DD')}`)
      // }

      return query
    },
    confirmDelete(id) {
      this.$swal({
        title: 'Bạn có chắc?',
        text: 'Bạn có muốn xóa?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý'
      }).then((result) => {
        if (result.value && id) {
          this.deleteItem(id)
        } else {
          this.showToast(id, 'error', 'Thao tác thất bại!')
        }
      })
    },
    showAlert() {
      this.$swal('Chức năng đang hoàn thiện')
    },
    showToast(id, type = 'success', msg) {
      this.$swal({
        type: type,
        title: msg || `${id ? 'Cập nhật' : 'Thêm mới'} thành công`,
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
