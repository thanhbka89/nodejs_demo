<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <index></index>
      </div>    
    </div>
  </section>
</template>

<script>
import Index from '../widgets/transaction/Index'

export default {
  name: 'Transaction',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
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
