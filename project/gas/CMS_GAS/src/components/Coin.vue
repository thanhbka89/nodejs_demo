/* eslint-disable no-console */
<template>
  <div>
    <p>Name: {{ coin.name }}</p>
    <p>Symbol: {{ coin.symbol }}</p>
    <p>Price (USD): {{ coin.price_usd }}</p>
  </div>
</template>

<script>
  import Common from '@/services/Common'

  export default {
    name: 'Coins',

    data() {
      return {
        coin: {}
      }
    },

    created() {
      this.fetchData()
    },

    watch: {
      '$route': 'fetchData'
    },

    methods: {
      fetchData() {
        Common.getCoin(this.$route.params.id)
        .then(response => {
          this.coin = response.data[0] 
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.log(e)
        })
      }
    }
  }
</script>