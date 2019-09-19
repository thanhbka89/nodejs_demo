<template>
  <!-- Main content -->
  <section class="content">
    <!-- GitHub hint -->
    <div class="row">
      <div class="col-xs-12">
        <alert :dismissible="true"
               :type="hasNetwork ? 'success' : 'error'"
               :iconClasses="['fa', 'fa-check']"
               title="Internet connection">
          <span>{{ hasNetwork ? 'Kết nối thành công đến API' : 'Không kết nối được tới Server API' }}</span>
        </alert>
      </div>

      <!-- Info boxes -->
      <div class="col-md-4 col-sm-6 col-xs-12">
        <info-box color-class="bg-aqua"
                  :icon-classes="['ion', 'ion-ios-game-controller-b-outline']"
                  text="Số lượng Máy"
                  :number="numberPS"></info-box>
      </div>
      <!-- /.col -->

      <!-- fix for small devices only -->
      <div class="clearfix visible-sm-block"></div>
      
      <div class="col-md-4 col-sm-6 col-xs-12">
        <info-box color-class="bg-green"
                  :icon-classes="['ion', 'ion-ios-cart-outline']"
                  :text="'Giao dịch tháng ' + currentMonth"
                  :number="numberTransaction"></info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-4 col-sm-6 col-xs-12">
        <info-box color-class="bg-red"
                  :icon-classes="['ion', 'ion-social-usd-outline']"
                  :text="'Doanh thu tháng ' + currentMonth"
                  :is-currency="true"
                  :number="revenue"></info-box>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <div class="col-xs-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title"></h3>
          <div class="box-body">
            <div class="col-sm-12 col-xs-12">
              <p class="text-center">
                <strong>Doanh thu trong tháng {{ currentMonth }}</strong>
              </p>
              <canvas id="revenueLine" ></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <!-- Main row -->
    <div class="row">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-yellow"
                  :icon-classes="['ion', 'ion-ios-people-outline']"
                  text="Thành viên"
                  :number="numberMember"></info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <process-info-box color-class="bg-green"
                          :icon-classes="['ion', 'ion-ios-heart-outline']"
                          text="Mentions"
                          number="92,050"
                          :progress="20"
                          description="20% increase in 30 days"></process-info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <process-info-box color-class="bg-red"
                          :icon-classes="['ion', 'ion-ios-cloud-download-outline']"
                          text="Downloads"
                          number="114,381"
                          :progress="70"
                          description="70% increase since yesterday"></process-info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <process-info-box color-class="bg-aqua"
                          :icon-classes="['ion', 'ion-ios-chatbubble-outline']"
                          text="Direct Messages"
                          number="163,921"
                          :progress="40"
                          description="40% increase compared to last year"></process-info-box>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
  </section>
  <!-- /.content -->
</template>

<script>
import Chart from 'chart.js'
import Alert from '@/components/widgets/Alert'
import InfoBox from '@/components/widgets/InfoBox'
import ProcessInfoBox from '@/components/widgets/ProcessInfoBox'
import api from '@/api'
import { formatDate } from '@/helpers'

export default {
  name: 'Dashboard',
  components: {
    Alert,
    InfoBox,
    ProcessInfoBox
  },
  data () {
    return {
      generateRandomNumbers (numbers, max, min) {
        var a = []
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max)
        }
        return a
      },
      hasNetwork: this.$store.getters.hasNetwork,
      numberPS: 0,
      numberMember: 0,
      numberTransaction: 0,
      currentMonth: formatDate({format: 'MM/YYYY'}),
      chartRevenue: {labels: [], datasets: []},
      revenue: 0,
      testArr: [],
      testText: ''
    }
  },
  computed: {
    coPilotNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    personalNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    isMobile () {
      return (window.innerWidth <= 800 && window.innerHeight <= 600)
    }
  },
  async created() {
    await Promise.all([
      this.getTotalPS(),
      this.getTotalMember(),
      this.getTotalTrans(),
      this.getTotalRevenueInMonth()
    ])
  },
  async mounted () {
    await this.getRevenueInMonth()
    const chartData = {
      type: 'line',
      data: {
        labels: this.chartRevenue.labels,
        datasets: [{
          label: 'Doanh thu',
          fill: false,
          borderColor: '#4BC0C0',
          pointBackgroundColor: '#4BC0C0',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          data: this.chartRevenue.datasets
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: !this.isMobile,
        legend: {
          position: 'bottom',
          display: true
        },
        tooltips: {
          mode: 'label',
          xPadding: 10,
          yPadding: 10,
          bodySpacing: 10
        }
      }
    }
    this.createChart('revenueLine', chartData)
  },
  methods: {
    async getTotalPS() {
      try {
        // get total number ps4 active
        const result = await api.request('get', '/ps/get/count?status=1')
        if (result.data.success) {
          this.numberPS = result.data.data
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getTotalMember() {
      try {
        // get total members active
        const result = await api.request('get', '/user/count?status=1')
        if (result.data.success) {
          this.numberMember = result.data.data
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getTotalTrans() {
      try {
        const currentDate = new Date()
        let from = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        from = formatDate({date: from})
        let to = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        to = formatDate({date: to})
        const result = await api.request('get', `/trans/get/count?from=${from}&to=${to}`)
        if (result.data.success) {
          this.numberTransaction = result.data.data
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getRevenueInMonth() {
      let date = new Date()
      const currentDay = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const labels = []
      const datasets = []
      let qDate = ''
      let index = ''
      let filterData = ''

      const result = await this.extract()

      for (let i = 1; i <= currentDay; i++) {
        index = i.toString()
        qDate = `${year}-${month.length > 1 ? month : '0' + month}-${index.length > 1 ? index : '0' + index}`
        filterData = result.filter(el => el.date === qDate)
        labels.push(index)
        datasets.push(filterData.length ? filterData[0].total : 0)
      }
      const data = {labels, datasets}
      this.chartRevenue = data
      return data
    },
    async getTransByDay() {
      try {
        const date = new Date()
        let from = new Date(date.getFullYear(), date.getMonth(), 1)
        from = formatDate({date: from})
        let to = date.setDate(date.getDate() + 1)
        to = formatDate({date: to})
        const result = await api.request('get', `/trans/p/1?from=${from}&to=${to}&limit=10000`)
        if (result.data.success) {
          return result.data.data
        }
      } catch (e) {
        console.error(e)
      }
    },
    async extract() {
      const data = await this.getTransByDay()

      let groups = Object.values(data.reduce((r, o) => {
        let date = o.created_at.split('T')[0]
        r[date] = r[date] || {date: date, total: 0}
        r[date].total += o.total_money
        return r
      }, {}))

      return groups
    },
    async getTotalRevenueInMonth() {
      try {
        const data = await this.getTransByDay()
        let revenue = data.reduce((sum, current) => {
          return sum + current.total_money
        }, 0)
        this.revenue = revenue
      } catch (e) {
        console.error(e)
      }
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId)
      const t = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      console.log(t)
    }
  },
  watch: {
    testArr: {
      // This will let Vue know to look inside the array, object
      deep: true,
      handler() {
        console.log('testArr changed')
      }
    },
    testText: {
      // Will fire as soon as the component is created
      immediate: true, // khi load trang, watcher sẽ tự động được kích hoạt
      handler(movie) {
        // Fetch data about the movie
        // fetch(`/${movie}`).then((data) => {
        //   this.movieData = data;
        // })
        console.log('New value: ' + movie)
      }
    }
  }
}
</script>

<style>
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
</style>
