<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <index :key="componentKey" @reRender="forceRerender"></index>
      </div>
    </div>
  </section>
</template>

<script>
import Index from '@/components/widgets/transaction/Index'

export default {
  name: 'Transaction',
  data() {
    return {
      componentKey: 0 // re-render a component
    }
  },
  created() {
  },
  methods: {
    // ham duoc goi tu component con
    forceRerender() {
      this.componentKey += 1
    }
  },
  components: {
    Index
  }
}
</script>

<style scoped>
.z-label {
  margin-top: 5px;
}
</style>
