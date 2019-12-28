/* eslint-disable no-console */
<template>
  <div>
    <p>Name: {{ coin.name }}</p>
    <p>Symbol: {{ coin.symbol }}</p>
    <p>Price (USD): {{ coin.price_usd }}</p>
  </div>
</template>

<script>
  import axios from 'axios'

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
        axios.get('https://api.coinmarketcap.com/v1/ticker/' + this.$route.params.id+'/')
        .then((resp) => {
          this.coin = resp.data[0]     
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err)
        })
      }
    }
  }
</script>