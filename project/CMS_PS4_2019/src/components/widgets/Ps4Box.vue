<template>
  <div class="info-box">
    <span :class="['info-box-icon', colorClass]">
      <i :class="iconClasses"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text">{{text}}</span>
      <span class="info-box-number">{{number}}</span>

      <span class="info-box-more z-more">
        <a href="#" class="btn btn-xs" @click="open_modal()">
          More info
          <i class="fa fa-arrow-circle-right"></i>
        </a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ps4Box',
  data() {
    return {
      msg: 'I am the child.'
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
    colorClass: {
      type: String,
      default: 'bg-default'
    },
    openModal: Function
  },
  created() {
    // goi ham cha
    this.$emit('created', this.msg) // communicate to parent components
  },
  methods: {
    open_modal() {
      console.log('Call OPEN Child')
      this.openModal(this.msg) // ham tu cha truyen vao con
    }
  }
}
</script>

<style>
.z-more {
  margin-top: 10px;
}
</style>
