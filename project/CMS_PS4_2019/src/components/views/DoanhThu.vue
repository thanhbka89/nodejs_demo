<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="table-wrapper">
          <div class="filters row">
              <div class="form-group col-sm-1 inventory-period">
                Chọn kỳ:
              </div>
              <div class="form-group col-sm-3">
                <date-picker v-model="period" lang="en" type="month" format="YYYY-MM" @change="search"></date-picker>
              </div>
              <div class="form-group col-sm-1">
                <button type="button" class="btn btn-primary" @click="onexport">Xuất Excel</button>
              </div>
          </div>
          <table class="table table-bordered table-condensed">
            <thead class="z-header">
              <tr style="border: 1px solid #f39c12;">
                <th>STT</th>
                <th>Kỳ</th>
                <th>Mã</th>
                <th>Tên hàng</th>
                <th>Số lượng <br />(1)</th>
                <th>Giá nhập <br />(2)</th>
                <th>Tiền vốn <br />(3 = 1 x 2)</th>
                <th>Giá bán  <br />(4)</th>
                <th>Doanh thu <br />(5 = 1 x 4)</th>                
                <th>Tiền lãi <br />(6 = 5 - 3)</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in filteredResources" :key="item.stt">
                <td class="col-md-1">{{ item.stt }}</td>
                <td class="col-md-1 item-code">{{ getDate }}</td>
                <td class="col-md-1 item-code">{{ item.code }}</td>
                <td class="col-md-3 item-code">{{ item.name }}</td>
                <td class="col-md-1">{{ item.quantity }}</td>
                <td class="col-md-1">{{ item.gia_nhap | toVnd }}</td>
                <td class="col-md-1">{{ item.tien_von | toVnd }}</td>
                <td class="col-md-1">{{ (parseInt(item.gia_ban) || 0) | toVnd }}</td>
                <td class="col-md-1">{{ item.doanh_thu | toVnd }}</td>
                <td class="col-md-1">{{ item.tien_lai | toVnd }}</td>
              </tr>
            </tbody>
            <tfoot>
                <tr>
                  <td colspan="6" class="text-right"></td>
                  <td colspan="2" class="text-right"><br /></td>
                </tr>
                <tr>
                  <td colspan="6" class="text-right">
                    <strong>Tổng tiền:</strong></td>
                  <td colspan="1" class="text-right">
                    <strong>{{ (this.total_doanh_thu - this.total_tien_lai) | toVnd }}</strong>
                  </td>
                  <td colspan="1" class="text-right"></td>
                  <td colspan="1" class="text-right">
                    <strong>{{ this.total_doanh_thu | toVnd }}</strong>
                  </td>
                  <td colspan="1" class="text-right">
                    <strong>{{ this.total_tien_lai | toVnd }}</strong>
                  </td>
                </tr>
              </tfoot>
          </table>
        </div>
      </div>    
    </div>
  </section>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import api from '@/api'
import { formatDate, getFirstDayInMonth, getLastDayInMonth } from '@/helpers'
import XLSX from 'xlsx'

export default {
  name: 'DoanhThu',
  components: { DatePicker },
  data() {
    return {
      items: [],
      period: formatDate({format: 'YYYY-MM'}),
      data: [],
      transactions: [],
      total_doanh_thu: 0,
      total_tien_lai: 0
    }
  },
  computed: {
    filteredResources() {
      return this.data // this.items
    },
    getDate() {
      return formatDate({date: this.period, format: 'MM/YYYY'})
    },
    getDateFrom() {
      let from = getFirstDayInMonth(this.period)
      return formatDate({ date: from })
    },
    getDateTo() {
      let to = getLastDayInMonth(this.period)
      return formatDate({ date: to })
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
        const response = await api.request('get', `/item/p/1?limit=1000`)
        this.items = response.data
      } catch (err) {
        console.error(err)
      }
    },
    async search() {
      const result = await this.extract()

      this.data = []
      this.total_doanh_thu = 0
      this.total_tien_lai = 0
      let item = {}
      result.forEach((el, idx) => {
        item = {}

        // Lay thong tin chi tiet dich vu trong master data
        let found = this.items.find((elem) => {
          return el.code === elem.code
        })

        item.stt = idx + 1
        item.id_item = el.id_item
        item.period = this.getDate
        item.code = el.code
        item.name = found ? found.name : 'N/A'
        item.quantity = Number.isInteger(el.quan)
          ? el.quan
          : el.quan.toFixed(2)

        item.gia_nhap = found ? found.gia_nhap : 0
        item.tien_von = item.gia_nhap * el.quan

        item.gia_ban = el.gia_ban
        item.discount = el.discount
        item.doanh_thu = el.thanh_tien

        item.tien_lai = item.doanh_thu - item.tien_von

        this.total_doanh_thu += item.doanh_thu
        this.total_tien_lai += item.tien_lai

        this.data.push(item)
      })
    },
    build_query() {
      let query = ''
      if (this.period) {
        query = query.concat(`&period=${this.getDate}`)
      }

      return query
    },
    onexport () {
      // export json to Worksheet of Excel
      // only array possible
      var animalWS = XLSX.utils.json_to_sheet(this.data)

      // A workbook is the name given to an Excel file
      var wb = XLSX.utils.book_new() // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, animalWS, 'Revenue') // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, `BCDoanhThu_${this.getDate}.xlsx`) // name of the file is 'book.xlsx'

      this.showToast('success', 'Tải file thành công!')
    },
    async getTransByDay() {
      try {
        const result = await api.request('get', `/trans/get/all_detail?from=${this.getDateFrom}&to=${this.getDateTo}`)
        if (result.data.success) {
          this.transactions = result.data.data
        }
      } catch (e) {
        console.error(e)
      }
    },
    async extract() {
      await this.getTransByDay()

      const data = this.transactions

      let groups = Object.values(data.reduce((r, o) => {
        let code = o.t2_code_item
        let quan = parseFloat(o.t2_quantity) || 0
        let thanhTien = o.t2_price * quan * (1 - (o.t2_discount || 0) / 100)
        r[code] = r[code] || {code: code, id_item: o.t2_id_item, quan: 0, gia_ban: o.t2_price, discount: o.t2_discount, thanh_tien: 0}
        r[code].quan += quan
        r[code].thanh_tien += thanhTien

        return r
      }, {}))

      return groups
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
.inventory-period {
  padding-top: 6px;
}
</style>
