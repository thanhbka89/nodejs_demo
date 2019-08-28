<template>
  <section class="content">
    <div class="row">
      <div class="large-12 medium-12 small-12 cell">
        <upload-file></upload-file>
      </div>
      <div class="col-xs-12">
        <button type="button" class="btn btn-default" @click="onexport">Excel Download</button>

        <div class="table-wrapper">
          <div class="table-title">
              <div class="row">
                  <div class="col-sm-6">
                      <h2>Report Nhập Xuất Tồn kho</h2>
                  </div>
              </div>
          </div>   

          <div class="filters row">
              <div class="form-group col-sm-6">
                <date-picker v-model="dateFrom" format="YYYY-MM-DD" lang="en" confirm placeholder="Từ ngày" @change="search"></date-picker>
                <date-picker v-model="dateTo" format="YYYY-MM-DD" lang="en" confirm placeholder="Đến ngày" @change="search"></date-picker>
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
                <td class="col-md-1 item-code">{{ item.ma_service }}</td>
                <td class="col-md-3 item-code">{{ item.name }}</td>
                <td class="col-md-1">{{ item.dauky_sl || 0 }}</td>
                <td class="col-md-1">{{ item.receive_trongky_sl }}</td>
                <td class="col-md-1">{{ item.receive_trongky_thanhtien | toVnd }}</td>
                <td class="col-md-1">{{ item.issue_trongky_sl }}</td>
                <td class="col-md-1">{{ item.issue_trongky_thanhtien | toVnd }}</td>
                <td class="col-md-1">{{ getTonkhoCuoiKy(item) }}</td>
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
import { formatDate } from '@/helpers'
import UploadFile from '@/components/views/UploadSingleFile'
import XLSX from 'xlsx'

const curDate = new Date()

export default {
  name: 'ReportNXT',
  components: { DatePicker, UploadFile },
  data() {
    return {
      items: [],
      dateFrom: new Date(curDate.getFullYear(), curDate.getMonth(), 1),
      dateTo: new Date().setDate(curDate.getDate() + 1),
      data: [
        {
          ma_service: '',
          name: '',
          dauky_sl: '',
          receive_trongky_sl: '',
          receive_trongky_thanhtien: '',
          issue_trongky_sl: '',
          issue_trongky_thanhtien: '',
          cuoiky_sl: '',
          cuoiky_thanhtien: ''
        }
      ],
      nhap_trong_ky: [],
      xuat_trong_ky: [],

      datas: {
        // We will make a Workbook contains 2 Worksheets
        'animals': [
          {name: 'cat', category: 'animal'},
          {name: 'dog', category: 'animal'},
          {name: 'pig', category: 'animal'}
        ]
      }
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
        const response = await api.request('get', `/item/p/1?limit=1993&status=1`)
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
        this.getXuatTrongKy()
      ])

      this.data = []
      let item = {}
      this.items.forEach((element, idx) => {
        item = {}
        item.id = idx + 1
        item.ma_service = element.code
        item.name = element.name
        // Nhap trong ky
        let found = this.nhap_trong_ky.find((el) => {
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

        this.data.push(item)
      })
    },
    async getNhapTrongKy() {
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
    onexport () {
      // export json to Worksheet of Excel
      // only array possible
      var animalWS = XLSX.utils.json_to_sheet(this.datas.animals)

      // A workbook is the name given to an Excel file
      var wb = XLSX.utils.book_new() // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, animalWS, 'animals') // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, 'book.xlsx') // name of the file is 'book.xlsx'
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
