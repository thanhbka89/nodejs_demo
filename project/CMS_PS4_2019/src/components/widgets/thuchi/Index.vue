<template>
  <div class="table-wrapper">
    <div class="table-title">
        <div class="row">
            <div class="col-sm-6">
                <h2>Giao dịch <b>Thu Chi</b></h2>
            </div>
            <div class="col-sm-6">
                <a href="#" class="btn btn-success" data-toggle="modal" @click="addItem"><span>Nhập Giao dịch</span></a>		
            </div>
        </div>
    </div>   

    <div class="filters row">
        <div class="form-group col-sm-4">
          <multiselect v-model="codeSelected" :options="codes" :custom-label="nameWithLang" placeholder="Tìm theo mastercode ..." label="code" track-by="id" @select="searchByCode">
          </multiselect>
        </div>
        <div class="form-group col-sm-2">
          <multiselect v-model="typeSelected" :options="types" :custom-label="nameWithLang" placeholder="Loại Thu/Chi" label="code" track-by="id" @select="searchByType">
          </multiselect>
        </div>
        <div class="form-group col-sm-6">
          <date-picker v-model="dateFrom" format="YYYY-MM-DD" lang="en" confirm placeholder="Từ ngày" @change="search"></date-picker>
          <date-picker v-model="dateTo" format="YYYY-MM-DD" lang="en" confirm placeholder="Đến ngày" @change="search"></date-picker>
        </div>
    </div>

    <table class="table table-striped table-hover">
      <thead class="z-header">
        <tr>
          <th>ID</th>
          <th>Ngày nhập</th>
          <th>Giao dịch</th>
          <th>Giá nhập</th>
          <th>Số lượng</th>
          <th>Trạng thái</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in filteredResources" :key="item.id">
          <td class="col-md-1">{{ item.id }}</td>
          <td class="col-md-2">{{ item.created_at | fDateTime }}</td>
          <td class="col-md-4">{{ item.name }}</td>
          <td class="col-md-2">{{ item.gia_nhap | toVnd }}</td>
          <td class="col-md-1">{{ item.quantity }}</td>
          <td class="col-md-1">{{ item.status ? 'Active' : 'Deleted' }}</td>
          <td class="col-md-1">
            <a href="#" class="icon margin-small-right" title="Chỉnh sửa">
              <i v-on:click="editItem(item)" class="fa fa-pencil"></i>
            </a>
            <a href="#" class="icon" title="Xóa">
              <i @click="confirmDelete(item.id)" class="fa fa-trash"></i>
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
import api from '@/api'
import DatePicker from 'vue2-datepicker'
import { formatDate } from '@/helpers'
import Multiselect from 'vue-multiselect'

export default {
  name: 'ThuChiIndex',
  components: { DatePicker, Multiselect },
  data() {
    return {
      searchKey: '',
      page: 1,
      limit: 15,
      totalPage: 10,
      items: [],
      dateFrom: '',
      dateTo: new Date().setDate(new Date().getDate() + 1), // get date tomorrow
      codeSelected: null, // search by mastercode
      types: [
        { id: 1, code: 1, name: 'Chi' },
        { id: 2, code: 2, name: 'Thu' }
      ],
      typeSelected: null // search by Thu/Chi
    }
  },
  props: {
    openModal: Function,
    codes: Array
  },
  computed: {
    filteredResources() {
      return this.items
    }
  },
  async created() {
    // run parallel
    await Promise.all([
      this.fetchItems(),
      this.paginateCallback()
    ])
  },

  methods: {
    async paginateCallback(page = 1) {
      let query = this.build_query()
      try {
        const response = await api.request('get', `/thuchi/p/${page}` + query)
        this.items = response.data.data
      } catch (err) {
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
      this.openModal({category: 1, status: 1})
    },
    editItem(item) {
      this.openModal(item)
    },
    async deleteItem(id) {
      try {
        const result = await api.request('delete', `/thuchi/${id}`)
        this.$emit('reRender') // call method of parent component to re-render
        if (result.data.success) {
          this.$showToast({})
        }
      } catch (e) {
        console.error(e)
      }
    },
    async count(filter = null) {
      filter = filter || ''
      try {
        const response = await api.request('get', `/thuchi/get/count${filter}`)
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
      if (this.limit) {
        query = query.concat(`&limit=${this.limit}`)
      }
      if (this.codeSelected) {
        query = query.concat(`&code=${this.codeSelected.code}`)
      }
      if (this.typeSelected) {
        query = query.concat(`&type=${this.typeSelected.code}`)
      }
      if (this.dateFrom) {
        query = query.concat(`&from=${formatDate({date: this.dateFrom})}`)
      }
      if (this.dateTo) {
        query = query.concat(`&to=${formatDate({date: this.dateTo})}`)
      }

      return query
    },
    async search() {
      let query = this.build_query()
      try {
        await this.count(query)
        await this.paginateCallback()
      } catch (err) {
        console.error(err)
      }
    },
    nameWithLang ({ code, name }) {
      return `[${code}] - ${name}`
    },
    searchByCode(option) {
      this.codeSelected = option
      this.search()
    },
    searchByType(option) {
      this.typeSelected = option
      this.search()
    },
    confirmDelete(id) {
      this.$swal({
        title: 'Xác nhận?',
        text: 'Bạn có muốn thực hiện Xóa ?',
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
.margin-small-right {
  margin-right: 10px;
}
</style>
