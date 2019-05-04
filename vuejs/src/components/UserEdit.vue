<template>
  <div class="component">
    <h3>Edit User</h3>
    <p>Tuoi cua toi: {{ age }} - {{ userAge }}</p>
    <button @click="editAge">Thay doi</button>
    <button @click="editAgeComNotSameParent">Giao tiep Hai component không cùng một parent trực tiếp</button>
    <div>
      <h3>Counter: {{ counter }}</h3>
      <button @click="increaseCounter">Increase</button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  props: ["userAge"],
  data() {
    return {
      counter: 0,
      age: this.userAge
    };
  },
  created() {
    console.log(this);  
  },
  methods: {
    editAge() {
      this.age += 1;
      this.$emit("ageWasEdited", this.age);
    },
    editAgeComNotSameParent() {
      this.age += 3;
      // thay vì emit sự kiện từ this instance, giờ mình emit nó từ eventBus
      //" this.$emit('ageWasEdited', this.userAge)
      eventBus.$emit("ageWasEditedNotSameParent", this.age);
    },
    increaseCounter() {
      this.counter++;
      this.$bus.emit("increaseCounter", this.counter);
    }
  }
};
</script>