<template>
  <div class="info-box">
    <span :class="['info-box-icon', colorClass]">
      <i :class="iconClasses"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text">{{text}}</span>
      <span>Trạng thái: </span>
      <span :class="localPs4Start ? 'z-ps4-on' : ''">
        {{localPs4Start ? 'Bật' : 'Tắt'}}
      </span>

      <span class="info-box-more z-more">
        <a v-if="localPs4Start" href="#" class="btn btn-xs" @click="open_modal()">
          More info
          <i class="fa fa-arrow-circle-right"></i>
        </a>
        <a v-else href="#" class="btn btn-xs" @click="play(number)">
          START
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
      lsPs4: JSON.parse(window.localStorage.getItem(this.number) || 'null')
    }
  },
  props: {
    text: {
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
  },
  mounted() {
    console.log('PS Mounted', this.msg)
    this.toggleOnClass()
  },
  methods: {
    open_modal() {
      console.log('Call OPEN Child')
      if (this.lsPs4) {
        this.openModal(this.lsPs4) // ham tu cha truyen vao con
      }
    },
    play(pNumber = 1) {
      let start = moment() // moment().subtract(2, 'hours')
      this.ps = {
        id: pNumber,
        origin: pNumber,
        start: start,
        start_hour: moment().format(moment.HTML5_FMT.TIME),
        elapsed: moment().diff(start, 'minutes'),
        play_hour: moment.utc().startOf('day').add({ minutes: 120 }).format('H:mm'),
        end: moment().add(7, 'hours')
      }
      window.localStorage.setItem(pNumber, JSON.stringify(this.ps))
      this.toggleOnPS4()
      this.toggleOnClass()
    },
    toggleOnPS4() {
      this.localPs4Start = !this.localPs4Start
    },
    toggleOnClass() {
      this.colorClass = this.localPs4Start ? 'bg-green' : 'bg-black'
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
