<template>
  <div class="component">
    <h3>User Details</h3>
    <p>Tuoi toi: {{ d_age }}</p>
    <button v-on:click="changeAge">Doi tuoi</button>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  props: ["d_age"],
  created() {
    eventBus.$on("ageWasEditedNotSameParent", age => {
      console.log("CHANGE AGE: eventBus", this, this.$data);
      this.d_age = age;
    });
  },
  methods: {
    changeAge() {
      console.log("CHANGE AGE");
      this.d_age = 24;
      this.$emit("ageWasUpdated", this.d_age);
    }
  }
};
</script>