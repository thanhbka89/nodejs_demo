<template>
  <div>
    <p>Name: {{ coin.name }}</p>
    <p>Symbol: {{ coin.symbol }}</p>
    <p>Price (USD): {{ coin.price_usd }}</p>
  </div>
</template>
<script>
import MockService from "@/services/MockService";

export default {
  name: "Coins",

  data() {
    return {
      coin: {}
    };
  },

  created() {
    this.fetchData();
  },

  watch: {
    $route: "fetchData"
  },

  methods: {
    async fetchData() {
      try {
        const response = await MockService.mockFetchCoin(this.$route.params.id)
        this.coin = response.data[0];
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>