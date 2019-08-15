<template>
  <div class="table-wrapper">
    <div class="table-title">
        <div class="row">
            <div class="col-sm-6">
                <h2>Manage <b>Transactions</b></h2>
            </div>
        </div>
    </div>   

    <div class="filters row">
        <div class="form-group col-sm-4">
          <multiselect v-model="memberSelected" :options="members" :custom-label="nameWithLang" placeholder="Tìm theo khách hàng ..." label="username" track-by="id" @select="searchByMember">
          </multiselect>
        </div>
        <div class="form-group col-sm-2">
          <multiselect v-model="psSelected" :options="listPS" placeholder="Tìm máy ..." label="name" track-by="id" @select="searchByPS" selectLabel="">
          </multiselect>
        </div>
        <div class="form-group col-sm-6">
          <date-picker v-model="dateFrom" format="YYYY-MM-DD" lang="en" confirm placeholder="Từ ngày" @change="search"></date-picker>
          <date-picker v-model="dateTo" format="YYYY-MM-DD" lang="en" confirm placeholder="Đến ngày" @change="search"></date-picker>
        </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <button class="btn btn-success" 
        @click="calcTotalMoney()">Tính tổng tiền các máy</button>           
      </div>
    </div>
    <table class="table table-striped table-hover">
      <thead class="z-header">
        <tr>
          <th><input type="checkbox" @click="select" v-model="allSelected" title="Chọn tất cả"></th>
          <th>ID</th>
          <th>Ngày</th>
          <th>Máy</th>
          <th>Khách hàng</th>
          <th>Tổng tiền</th>          
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in filteredResources" :key="item.id">
          <td>
            <input type="checkbox" v-model="transIds" :value="item.id">
          </td>
          <td class="col-md-1">{{ item.id }}</td>
          <td class="col-md-3">{{ item.created_at | fDateTime }}</td>
          <td class="col-md-2">{{ getPSName(item.id_ps) || 'Máy PS' }}</td>
          <td class="col-md-2">{{ getMemberName(item.id_user) || 'Khách lẻ' }}</td>
          <td class="col-md-2">{{ item.total_money | toVnd }}</td>
          <td class="col-md-2">
            <button class="btn btn-primary" @click="viewItem(item)">Chi tiết</button>           
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
import { formatDate, toVND } from '@/helpers'
import Multiselect from 'vue-multiselect'

export default {
  name: 'TransactionIndex',
  components: { DatePicker, Multiselect },
  data() {
    return {
      searchKey: '',
      page: 1,
      limit: 15,
      totalPage: 10,
      items: [],
      listPS: [], // get list PS from API
      dateFrom: '',
      dateTo: new Date().setDate(new Date().getDate() + 1), // get date tomorrow
      allSelected: false,
      transIds: [],
      memberSelected: null,
      members: [], // get list members from api
      psSelected: null
    }
  },
  props: {
  },
  computed: {
    filteredResources() {
      return this.items
    }
  },
  async created() {
    // this.fetchItems()
    // this.paginateCallback()
    // await this.getListPS()

    // run parallel
    await Promise.all([
      this.fetchItems(),
      this.paginateCallback(),
      this.getListPS(),
      this.getMembers()
    ])
  },
  methods: {
    async paginateCallback(page = 1) {
      let query = this.build_query()
      try {
        const response = await api.request('get', `/trans/p/${page}` + query)
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
    viewItem(item) {
      let route = {
        name: 'CheckOut',
        params: { id: item.id },
        query: { command: 'view' }
      }
      this.$router.push(route)
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
    async count(filter = null) {
      filter = filter || ''
      try {
        const response = await api.request('get', `/trans/get/count${filter}`)
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
      // if (this.searchKey) {
      //   query = query.concat(`user=${this.searchKey}`)
      // }
      if (this.limit) {
        query = query.concat(`&limit=${this.limit}`)
      }
      if (this.memberSelected) {
        query = query.concat(`&user=${this.memberSelected.id}`)
      }
      if (this.psSelected) {
        query = query.concat(`&ps=${this.psSelected.id}`)
      }
      if (this.dateFrom) {
        query = query.concat(`&from=${formatDate({date: this.dateFrom})}`)
      }
      if (this.dateTo) {
        query = query.concat(`&to=${formatDate({date: this.dateTo})}`)
      }

      return query
    },
    async getListPS() {
      try {
        const result = await api.request('get', '/ps/p/1?limit=100')
        if (result.data.success) {
          this.listPS = result.data.data
        }
      } catch (e) {
        console.error(e)
      }
    },
    getPSName(id) {
      let name = null
      if (this.listPS.length) {
        const result = this.listPS.filter(item => item.id === id)
        name = result.length ? result[0].name : null
      }

      return name
    },
    getMemberName(id) {
      let name = null
      if (this.members.length) {
        const result = this.members.filter(item => item.id === id)
        name = result.length ? result[0].username : null
      }

      return name
    },
    select: function() {
      this.transIds = []
      if (!this.allSelected) {
        for (let idx in this.filteredResources) {
          this.transIds.push(this.filteredResources[idx].id)
        }
      }
    },
    calcTotalMoney() {
      let sum = 0
      for (let idx in this.transIds) {
        let res = this.filteredResources.find(item => item.id === this.transIds[idx])
        if (res) {
          sum += res.total_money
        }
      }
      this.transIds = []
      this.showAlert(toVND(sum))
    },
    async getMembers() {
      try {
        const response = await api.request('get', `/user/p/1?limit=1000`)
        this.members = response.data
        // add Khach le vao dau mang
        this.members.unshift({id: 0, fullname: 'Khách lẻ', username: '', phone: '.'})
      } catch (err) {
        console.error(err)
      }
    },
    nameWithLang ({ username, fullname, phone }) {
      return `[${username}] - ${fullname} - [${phone}]`
    },
    showAlert(id) {
      this.$swal(
            'Tổng tiền cần thanh toán : ' + id,
            '',
            'success'
          )
    },
    searchByMember(option) {
      this.memberSelected = option
      this.search()
    },
    searchByPS(option) {
      this.psSelected = option
      this.search()
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
