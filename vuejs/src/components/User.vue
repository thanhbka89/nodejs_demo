<template>
  <div class="component">
    <p>Ten toi la {{ name }}</p>
    <p>Toi nam nay {{ age }} tuoi</p>
    <button @click="resetAge">Reset tuoi</button>
    <hr>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-6">
        <app-user-detail v-bind:age="age" @ageWasUpdated="age = $event"></app-user-detail>
      </div>
      <div class="col-xs-12 col-sm-6 col-6">
          <!-- // chỗ này lười viết func thay đổi age để inline luôn nhé :))
        // $event chính là thằng data mình gửi lên trong hàm emit \từ UserEdit -->
        <app-user-edit :user-age="age" @ageWasEdited="age = $event"></app-user-edit>        
      </div>
    </div>
  </div>
</template>

<script>
import UserDetail from "./UserDetail.vue";
import UserEdit from "./UserEdit.vue";

export default {
  data: function() {
    return {
      name: "Duy",
      age: 23
    };
  },

  components: {
    appUserDetail: UserDetail,
    appUserEdit: UserEdit
  },

  methods: {
    resetAge() {
      this.age = 23;
    }
  }
};
</script>