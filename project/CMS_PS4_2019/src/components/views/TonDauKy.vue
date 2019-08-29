<template>
  <section class="content">
    <div class="row">
      <div class="large-12 medium-12 small-12 cell">
        <upload-file title="Chọn file upload"
        tooltip="Kiểm kê thực tế Tồn cuối kỳ, đầu tiên chọn Kỳ rồi click nút Xuất Excel. Cập nhật dữ liệu kiểm kê ở cột sl_thucte trong file excel. Sau đó, chọn file vừa chỉnh sửa và click nút Upload để post lên hệ thống."
        buttonName="Upload"
        method="/upload/kiem_ke">
        </upload-file>
      </div>
      <div class="col-xs-12">
        <div class="table-wrapper">
          <div class="table-title">
              <div class="row">
                  <div class="col-sm-6">
                      <h2>Tồn kho cuối kỳ</h2>
                  </div>
              </div>
          </div>   

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
                <th>Kiểm kê hệ thống</th>
                <th>Kiểm kê thực tế</th>
                <th>SL chênh lệch</th>
                <th>Tỷ lệ %</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in filteredResources" :key="item.stt">
                <td class="col-md-1">{{ item.stt }}</td>
                <td class="col-md-1 item-code">{{ getDate }}</td>
                <td class="col-md-1 item-code">{{ item.code }}</td>
                <td class="col-md-2 item-code">{{ item.name }}</td>
                <td class="col-md-2">{{ item.sl_tinhtoan }}</td>
                <td class="col-md-2">{{ item.sl_thucte }}</td>
                <td class="col-md-1">{{ item.sl_thucte - item.sl_tinhtoan }}</td>
                <td class="col-md-1">{{ Math.ceil((item.sl_thucte - item.sl_tinhtoan) / item.sl_thucte * 100) }}</td>
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

export default {
  name: 'TonDauKy',
  components: { DatePicker, UploadFile },
  data() {
    return {
      items: [],
      period: formatDate({format: 'YYYY-MM'}),
      data: [],
      nhap_trong_ky: []
    }
  },
  computed: {
    filteredResources() {
      return this.data // this.items
    },
    getDate() {
      return formatDate({date: this.period, format: 'MM/YYYY'})
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
      await Promise.all([
        this.getDataTrongKy()
      ])

      this.data = []
      let item = {}
      this.items.forEach((element, idx) => {
        item = {}
        item.stt = idx + 1
        item.id_item = element.id
        item.period = this.getDate
        item.code = element.code
        item.name = element.name
        item.sl_thucte = 0
        // Nhap trong ky
        let found = this.nhap_trong_ky.find((el) => {
          return element.code === el.code
        })
        if (found) {
          item.id_item = found.id_item || element.id
          item.period = found.period || this.getDate
          item.sl_thucte = found.sl_thucte || 0
          item.sl_tinhtoan = found.sl_tinhtoan || 0
        }

        this.data.push(item)
      })
    },
    async getDataTrongKy() {
      let query = this.build_query()
      try {
        const response = await api.request('get', `/kiemke/p/1?limit=1993` + query)
        this.nhap_trong_ky = response.data.data
      } catch (err) {
        console.error(err)
      }
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
      XLSX.utils.book_append_sheet(wb, animalWS, 'TonDauKy') // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, `NhapTonDauKy_${this.getDate}.xlsx`) // name of the file is 'book.xlsx'

      this.showToast('success', 'Tải file thành công!')
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
