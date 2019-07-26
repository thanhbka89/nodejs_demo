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
        <div class="form-group col-sm-3">
            <input v-model="searchKey" class="form-control" id="search-element" type="text" placeholder="Tìm kiếm giao dịch ..." aria-label="Search" @keyup.enter="search" autocomplete="off"/>
        </div>
    </div>

    <table class="table table-striped table-hover">
      <thead class="z-header">
        <tr>
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
          <td class="col-md-1">{{ item.id }}</td>
          <td class="col-md-3">{{ item.created_at | fDateTime }}</td>
          <td class="col-md-1">{{ getPSName(item.id_ps) || 'Máy PS' }}</td>
          <td class="col-md-3">{{ item.id_user || 'Khách lẻ' }}</td>
          <td class="col-md-2">{{ item.total_money | toVnd }}</td>
          <td class="col-md-2">
            <button class="btn btn-primary" @click="viewItem(item)">Xem chi tiết</button>           
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
  name: 'TransactionIndex',
  data() {
    return {
      searchKey: '',
      page: 1,
      limit: 10,
      totalPage: 10,
      items: [],
      listPS: [] // get list PS from API
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
    await Promise.all([this.fetchItems(), this.paginateCallback(), this.getListPS()])
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
      if (this.searchKey) {
        query = query.concat(`user=${this.searchKey}`)
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
    async getListPS() {
      try {
        // get list ps4 active
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
