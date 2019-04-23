<template>
  <div class="component">
    <h3>Edit User</h3>
    <p>Tuoi cua toi: {{ userAge }}</p>
    <button @click="editAge">Thay doi</button>
    <button @click="editAgeComNotSameParent">Giao tiep Hai component không cùng một parent trực tiếp</button>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  props: ["userAge"],
  methods: {
    editAge() {
      this.userAge += 1;
      this.$emit("ageWasEdited", this.userAge);
    },
    editAgeComNotSameParent() {
      this.userAge += 3;
      // thay vì emit sự kiện từ this instance, giờ mình emit nó từ eventBus
      //" this.$emit('ageWasEdited', this.userAge)
      eventBus.$emit("ageWasEditedNotSameParent", this.userAge);
    }
  }
};
</script>