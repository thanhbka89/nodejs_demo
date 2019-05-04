<template>
  <div class="component">
    <h3>User Details</h3>
    <p>Tuoi toi: {{ age }} - {{ d_age }}</p>
    <button v-on:click="changeAge">Doi tuoi</button>
    <div>
      <h3>Counter from Foo: {{ counter }}</h3>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  props: ["d_age"],
  data() {
    return {
      counter: 0,
      age : this.d_age
    };
  },
  created() {
    eventBus.$on("ageWasEditedNotSameParent", age => {
      console.log("CHANGE AGE: eventBus", this, this.$data);
      this.age = age;
    });

    this.$bus.on("increaseCounter", value => {
      console.log("EvenBus", this, this.$data);
      this.counter = value;
    });
  },
  methods: {
    changeAge() {
      console.log("CHANGE AGE");
      this.age = 24;
      this.$emit("ageWasUpdated", this.age);
    }
  }
};
</script>