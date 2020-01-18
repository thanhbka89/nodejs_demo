<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="table-wrapper">
          <div class="table-title">
              <div class="row">
                  <div class="col-sm-6">
                      <h2>Lịch sử đăng nhập</h2>
                  </div>
              </div>
          </div>

          <div class="filters row">
              <div class="form-group col-sm-6">
                <date-picker v-model="dateFrom" format="YYYY-MM-DD" lang="en" confirm placeholder="Từ ngày" @change="search"></date-picker>
                <date-picker v-model="dateTo" format="YYYY-MM-DD" lang="en" confirm placeholder="Đến ngày" @change="search"></date-picker>
              </div>
          </div>
          <div class="table-responsive">
            <table class="table table-bordered table-condensed">
              <thead class="z-header">
                <tr style="border: 1px solid #f39c12;">
                  <th>STT</th>
                  <th>DateTime</th>
                  <th>User</th>
                  <th>IP</th>
                  <th>Browser</th>                
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in filteredResources" :key="item.id">
                  <td class="col-md-1">{{ item.id }}</td>
                  <td class="col-md-2 item-code">{{ item.created_at | fDateTime  }}</td>
                  <td class="col-md-1 item-code">{{ getMemberName(item.id_user) }}</td>
                  <td class="col-md-2 item-code">{{ item.ip }}</td>
                  <td class="col-md-6 item-code">{{ item.browser || 'N#A' }}</td>  
                </tr>
              </tbody>
            </table>
          </div>

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
            :first-last-button="true"></paginate>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import api from '@/api'
import { formatDate } from '@/helpers'

const curDate = new Date()

export default {
  name: 'ReportHistoryLogin',
  components: { DatePicker },
  data() {
    return {
      page: 1,
      limit: 20,
      totalPage: 10,
      items: [],
      dateFrom: new Date(curDate.getFullYear(), curDate.getMonth(), 1),
      dateTo: new Date().setDate(curDate.getDate() + 1),
      members: [] // get list members from api
    }
  },
  computed: {
    filteredResources() {
      return this.items
    }
  },
  async created() {
    await Promise.all([
      this.count(),
      this.paginateCallback(),
      this.search(),
      this.getMembers()
    ])
  },
  methods: {
    async paginateCallback(page = 1) {
      let query = this.build_query()
      try {
        const response = await api.request('get', `/history_login/p/${page}${query}`)
        this.items = response.data.data
      } catch (err) {
        console.error(err)
      }
    },
    async search() {
      if (!this.dateFrom || !this.dateTo) {
        this.showAlert('Vui lòng chọn ngày tháng!')
        return
      }
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
        const response = await api.request('get', `/history_login/get/count${filter}`)
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
    async getMembers() {
      try {
        const response = await api.request('get', `/user/p/1?limit=1000`)
        this.members = response.data
      } catch (err) {
        console.error(err)
      }
    },
    getMemberName(id) {
      let name = null
      if (this.members.length) {
        const result = this.members.filter(item => item.id === id)
        name = result.length ? result[0].username : null
      }

      return name
    },
    build_query() {
      let query = '?'
      if (this.limit) {
        query = query.concat(`&limit=${this.limit}`)
      }
      if (this.dateFrom) {
        query = query.concat(`&from=${formatDate({date: this.dateFrom})}`)
      }
      if (this.dateTo) {
        query = query.concat(`&to=${formatDate({date: this.dateTo})}`)
      }

      return query
    },
    showAlert(msg = null) {
      this.$swal(msg || 'Cảnh báo!')
    }
  }
}

</script>

<style scoped>
thead th,td {
   text-align: center;
   vertical-align: middle!important;
}
.z-label {
  margin-top: 5px;
}
.item-code {
  text-align: left;
}
.table-bordered>thead>tr>th {
  border: 1px solid #f39c12;
}
</style>
