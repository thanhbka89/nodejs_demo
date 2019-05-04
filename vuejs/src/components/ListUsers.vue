<template>
  <div class="danhsach">
    <h2>{{title}}</h2>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Password</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in datas">
          <td>{{data.id}}</td>
          <td>{{data.name}}</td>
          <td>{{data.password}}</td>
          <td>{{data.age}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

 <script>
import MockService from "@/services/MockService"

export default {
  data() {
    return {
      title: "Danh sách User",
      datas: []
    };
  },
  created: function() {
    this.danhsach_user();
    this.list_users()
  },
  methods: {
    danhsach_user() {
      this.axios
        .get("https://599f807effe73c0011b9fcc5.mockapi.io/api/user")
        .then(response => {
          this.datas = response.data;
        });
    },
    async list_users() {
      try { 
        const response = await MockService.mockFetchUsers();
        console.log('ASYNC Axios', response.data);
      }catch (e) {
        console.log(e);       
      }
    }
  }
};
</script>

 <style>
table {
  right: 0;
  left: 0;
  top: 0;
  margin: auto;
}
table tr th {
  background: rgba(0, 145, 234, 1);
  padding: 10px;
  color: #fff;
}
table tr td {
  padding: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 15px;
}
</style>