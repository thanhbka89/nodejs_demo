<template>
  <div class="customer">
    <h1>I'm a customer</h1>
    <p>I see {{ totalTvCount }} TVs!</p>
  </div>
</template>

<script>
    export default {
        name: "Customer",
        computed: {
            totalTvCount() {                
                return this.$store.state.totalTvCount;
            }
        }
    };
</script>

<style scoped>
</style>