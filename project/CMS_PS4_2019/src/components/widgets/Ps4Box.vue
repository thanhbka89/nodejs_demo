<template>
  <div class="info-box">
    <span :class="['info-box-icon', colorClass]">
      <i :class="iconClasses"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text" style="text-align: left">{{ text }}</span>
      <p style="text-align: left">
        <span>Trạng thái: </span>
        <span :class="localPs4Start ? 'z-ps4-on' : ''">
          {{ localPs4Start ? 'Bật' : 'Tắt' }}
        </span>
      </p>

      <span class="info-box-more z-more">
        <template v-if="localPs4Start">
        <a href="#" class="btn btn-xs" @click="open_modal()">
          Xem chi tiết
          <i class="fa fa-arrow-circle-right"></i>
        </a>
        <a href="#" class="btn btn-xs" @click="change_machine()">
          Chuyển máy
          <i class="fa fa-arrow-circle-right"></i>
        </a>
        </template>
        <a v-else href="#" class="btn btn-xs" @click="play(number)">
          <strong>TÍNH GIỜ</strong>
          <i class="fa fa-play-circle-o"></i>
        </a>
      </span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Ps4Box',
  data() {
    return {
      msg: 'I am the child.',
      colorClass: 'bg-black',
      ps: {
        id: 1, // so may
        origin: '', // may dang choi truoc khi chuyen
        start: Date.now(),
        end: '',
        items: {}
      },
      localPs4Start: this.ps4Start,
      lsPs4: {}
    }
  },
  props: {
    idPs: {
      type: Number
    },
    text: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    number: {
      type: String,
      default: ''
    },
    iconClasses: {
      type: Array,
      default: []
    },
    openModal: { type: Function }, // openModal: Function,
    openModalChange: Function,
    ps4Start: {
      type: Boolean,
      default: false
    }
  },
  computed: {

  },
  created() {
    // goi ham cha
    this.$emit('created', this.msg) // communicate to parent components
    console.log('PS Created')
    this.getLS()
  },
  mounted() {
    console.log('PS Mounted', this.msg)
    this.toggleOnClass()
  },
  methods: {
    open_modal() {
      console.log('Call OPEN Child')
      this.getLS()
      if (this.lsPs4) {
        this.openModal(this.lsPs4) // ham tu cha truyen vao con
      }
    },
    change_machine() {
      this.getLS()
      if (this.lsPs4) {
        this.openModalChange(this.lsPs4) // ham tu cha truyen vao con
      }
    },
    play(pNumber = 1) {
      let start = moment() // moment().subtract(2, 'hours')
      this.ps = {
        id: pNumber,
        name: this.text,
        code: this.code,
        id_ps: this.idPs,
        origin: pNumber,
        start: start,
        start_hour: moment().format(moment.HTML5_FMT.TIME),
        elapsed: moment().diff(start, 'minutes'),
        play_hour: moment.utc().startOf('day').add({ minutes: 120 }).format('H:mm'),
        end: start.format('YYYY-MM-DD HH:mm:ss')
        // end: moment().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss')
      }
      this.lsPs4 = this.ps
      window.localStorage.setItem(pNumber, JSON.stringify(this.ps))
      this.toggleOnPS4()
      this.toggleOnClass()
    },
    toggleOnPS4() {
      this.localPs4Start = !this.localPs4Start
    },
    toggleOnClass() {
      this.colorClass = this.localPs4Start ? 'bg-green' : 'bg-black'
    },
    getLS() {
      this.lsPs4 = JSON.parse(window.localStorage.getItem(this.number) || 'null')
    }
  }
}
</script>

<style scoped>
.info-box-text {
  font-weight: bold;
}
.z-more {
  margin-top: 10px;
}

.z-ps4-on {
  font-weight: bold;
  color: #42b527;
}
</style>
