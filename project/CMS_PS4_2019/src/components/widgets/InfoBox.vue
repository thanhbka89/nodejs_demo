<template>
  <div class="info-box">
    <span :class="['info-box-icon', colorClass]">
      <i :class="iconClasses"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text">{{ text }}</span>
      <span class="info-box-number">{{ displayNumber }}</span>
    </div>
  </div>
</template>

<script>
import { toVND } from '@/helpers'

export default {
  name: 'InfoBox',
  props: {
    text: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      default: 0
    },
    iconClasses: {
      type: Array,
      default: []
    },
    colorClass: {
      type: String,
      default: 'bg-default'
    },
    isCurrency: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    displayNumber() {
      return this.isCurrency ? toVND(this.number) : this.number
    }
  }
}
</script>
