<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="table-wrapper">
          <div class="table-title">
              <div class="row">
                  <div class="col-sm-6">
                      <h2>Báo cáo nhập xuất tồn kho</h2>
                  </div>
              </div>
          </div>   

          <div class="filters row">
              <div class="form-group col-sm-6">
                <date-picker v-model="dateFrom" format="YYYY-MM-DD" lang="en" confirm placeholder="Từ ngày" @change="search"></date-picker>
                <date-picker v-model="dateTo" format="YYYY-MM-DD" lang="en" confirm placeholder="Đến ngày" @change="search"></date-picker>
              </div>
              <div class="form-group col-sm-2">
                <button type="button" class="btn btn-primary" @click="updateKiemKe">Cập nhật Kiểm kê</button>
              </div>
          </div>
          <table class="table table-bordered table-condensed">
            <thead class="z-header">
              <tr style="border: 1px solid #f39c12;">
                <th rowspan="2">STT</th>
                <th rowspan="2">Mã</th>
                <th rowspan="2">Tên hàng</th>
                <th>Tồn kho đầu kỳ</th>
                <th colspan="2">Nhập trong kỳ</th>
                <th colspan="2">Xuất trong kỳ</th>
                <th>Tồn kho cuối kỳ</th>
              </tr>
              <tr>
                <th>Số lượng</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>          
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Số lượng</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in filteredResources" :key="item.id">
                <td class="col-md-1">{{ item.id }}</td>
                <td class="col-md-1 item-code">{{ item.code }}</td>
                <td class="col-md-3 item-code">{{ item.name }}</td>
                <td class="col-md-1">{{ item.dauky_sl || 0 }}</td>
                <td class="col-md-1">{{ item.receive_trongky_sl }}</td>
                <td class="col-md-1">{{ item.receive_trongky_thanhtien | toVnd }}</td>
                <td class="col-md-1">{{ item.issue_trongky_sl }}</td>
                <td class="col-md-1">{{ item.issue_trongky_thanhtien | toVnd }}</td>
                <td class="col-md-1">{{ item.sl_tinhtoan }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>    
    </div>
  </section>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import api from '@/api'
import { formatDate, getPreviousMonth } from '@/helpers'

const curDate = new Date()

export default {
  name: 'ReportNXT',
  components: { DatePicker },
  data() {
    return {
      items: [],
      dateFrom: new Date(curDate.getFullYear(), curDate.getMonth(), 1),
      dateTo: new Date().setDate(curDate.getDate() + 1),
      data: [
        {
          code: '',
          name: '',
          dauky_sl: '',
          receive_trongky_sl: '',
          receive_trongky_thanhtien: '',
          issue_trongky_sl: '',
          issue_trongky_thanhtien: '',
          sl_tinhtoan: '' // Ton kho cuoi ky
        }
      ],
      nhap_trong_ky: [],
      xuat_trong_ky: [],
      ton_dau_ky: []
    }
  },
  computed: {
    filteredResources() {
      return this.data // this.items
    }
  },
  async created() {
    await Promise.all([
      this.getItems(),
      this.search()
    ])
  },
  methods: {
    async getItems() {
      try {
        const response = await api.request('get', `/item/cate_active/1,2,4`)
        this.items = response.data
      } catch (err) {
        console.error(err)
      }
    },
    async search() {
      if (!this.dateFrom || !this.dateTo) {
        this.showAlert('Vui lòng chọn ngày tháng!')
        return
      }
      await Promise.all([
        this.getNhapTrongKy(),
        this.getXuatTrongKy(),
        this.getTonkhoDauKy()
      ])

      this.data = []
      let item = {}
      this.items.forEach((element, idx) => {
        item = {}
        item.id = idx + 1
        item.id_item = element.id
        item.code = element.code
        item.name = element.name
        // Ton dau ky
        let found = this.ton_dau_ky.find((el) => {
          return element.code === el.code && element.id === el.id_item
        })
        if (found) {
          item.dauky_sl = found.sl_thucte
        }

        // Nhap trong ky
        found = this.nhap_trong_ky.find((el) => {
          return element.code === el.code
        })
        if (found) {
          item.receive_trongky_sl = found.quantity
          item.receive_trongky_thanhtien = found.total_money
        }

        // Xuat trong ky
        found = this.xuat_trong_ky.find((el) => {
          return element.code === el.code
        })
        if (found) {
          item.issue_trongky_sl = found.quantity
          item.issue_trongky_thanhtien = found.total_money
        }

        // Ton kho cuoi ky
        item.sl_tinhtoan = this.getTonkhoCuoiKy(item)

        this.data.push(item)
      })
    },
    async getNhapTrongKy() {
      this.nhap_trong_ky = []
      let query = this.build_query()
      try {
        const response = await api.request('get', `/inventory/p/1?limit=1993&status=1` + query)
        let temp = response.data.data
        let groups = Object.values(temp.reduce((r, o) => {
          let date = o.code
          r[date] = r[date] || {code: o.code, total_money: 0, quantity: 0}
          r[date].total_money += o.gia_nhap
          r[date].quantity += o.quantity
          return r
        }, {}))
        this.nhap_trong_ky = groups
      } catch (err) {
        console.error(err)
      }
    },
    async getXuatTrongKy() {
      this.xuat_trong_ky = []
      let query = this.build_query()
      try {
        const response = await api.request('get', `/trans/trans_detail/p/1?limit=21993` + query)
        let temp = response.data.data
        let groups = Object.values(temp.reduce((r, o) => {
          let date = o.code_item
          r[date] = r[date] || {code: o.code_item, total_money: 0, quantity: 0}
          r[date].total_money += (parseInt(o.quantity) || 0) * (parseInt(o.price) || 0)
          r[date].quantity += parseInt(o.quantity) || 0
          return r
        }, {}))
        this.xuat_trong_ky = groups
      } catch (err) {
        console.error(err)
      }
    },
    async getTonkhoDauKy() {
      this.ton_dau_ky = []
      // Ton dau ky thang nay = ton cuoi ky da kiem ke cua thang truoc
      let fromPeriod = formatDate({date: this.dateFrom, format: 'MM/YYYY'})
      let toPeriod = formatDate({date: this.dateTo, format: 'MM/YYYY'})
      // Chi thuc hien cho cùng kỳ
      if (fromPeriod === toPeriod) {
        try {
          // get ky truoc
          let lastPeriod = getPreviousMonth({date: this.dateFrom, format: 'MM/YYYY'})
          const response = await api.request('get', `/kiemke/p/1?limit=1993&period=${lastPeriod}`)
          this.ton_dau_ky = response.data.data
        } catch (err) {
          console.error(err)
        }
      }
    },
    getTonkhoCuoiKy(item) {
      return (parseInt(item.dauky_sl) || 0) + (parseInt(item.receive_trongky_sl) || 0) - (parseInt(item.issue_trongky_sl) || 0)
    },
    build_query() {
      let query = ''
      if (this.dateFrom) {
        query = query.concat(`&from=${formatDate({date: this.dateFrom})}`)
      }
      if (this.dateTo) {
        query = query.concat(`&to=${formatDate({date: this.dateTo})}`)
      }

      return query
    },
    async updateKiemKe() {
      // Ton dau ky thang nay = ton cuoi ky da kiem ke cua thang truoc
      let fromPeriod = formatDate({date: this.dateFrom, format: 'MM/YYYY'})
      let toPeriod = formatDate({date: this.dateTo, format: 'MM/YYYY'})
      // Chi thuc hien cho cùng kỳ
      if (fromPeriod === toPeriod) {
        try {
          const data = {
            items: this.data,
            period: fromPeriod
          }
          const response = await api.request('post', `/kiemke/post/mass_save`, data)
          if (response.data.success) {
            this.showToast()
          } else {
            this.showToast('error', response.data.data.code)
          }
        } catch (err) {
          console.error(err)
        }
      }
    },
    showAlert(msg = null) {
      this.$swal(msg || 'Cảnh báo!')
    },
    showToast(type = 'success', message = '') {
      this.$swal({
        type: type,
        title: message || `Cập nhật thành công`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000
      })
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
