<template>
  <div class="table-wrapper">
    <div class="table-title">
        <div class="row">
            <div class="col-sm-6">
                <h2>Manage <b>Vendors</b></h2>
            </div>
            <div class="col-sm-6">
                <a href="#" class="btn btn-success" data-toggle="modal"><span>Add New Vendor</span></a>		
            </div>
        </div>
    </div>   

    <div class="filters row">
        <div class="form-group col-sm-3">
            <label for="search-element">invoice name</label>
            <input v-model="searchKey" class="form-control" id="search-element" requred/>
        </div>
    </div>

    <table class="table table-striped table-hover">
      <thead class="z-header">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.phone }}</td>
          <td>
            <button class="btn btn-primary" @click="editItem(item)">Edit</button>
             <a href="#" class="icon">
                <i v-on:click="onEdit(product)" class="fa fa-pencil"></i>
            </a>
            <button class="btn btn-danger" @click="deleteItem(item.id)">Delete</button>
            <a href="#" class="icon">
                <i v-on:click="onDelete(product.id)" class="fa fa-trash"></i>
            </a>
            <a href="#" class="icon">
                <i v-on:click="onDelete(product.id)" class="fa fa-eye"></i>
            </a>            
          </td>
        </tr>
      </tbody>
    </table>

    <div class="clearfix">
        <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
        <ul class="pagination">
            <li class="page-item disabled"><a href="#">Previous</a></li>
            <li class="page-item"><a href="#" class="page-link">1</a></li>
            <li class="page-item"><a href="#" class="page-link">2</a></li>
            <li class="page-item active"><a href="#" class="page-link">3</a></li>
            <li class="page-item"><a href="#" class="page-link">4</a></li>
            <li class="page-item"><a href="#" class="page-link">5</a></li>
            <li class="page-item"><a href="#" class="page-link">Next</a></li>
        </ul>
    </div>
  </div>
</template>
<script>
import api from '../../../api'

export default {
  name: 'VendorIndex',
  data() {
    return {
      searchKey: '',
      items: []
    }
  },
  props: {
    openModal: Function
  },
  created: function() {
    this.fetchItems()
  },

  methods: {
    fetchItems() {
      api
        .request('get', '/vendor')
        .then(response => {
          console.log(response)
          this.items = response.data
        })
        .catch(e => {
          console.error(e)
        })
    },
    editItem(item) {
      this.openModal(item)
    },
    deleteItem(id) {
      console.log(id)
      api
        .request('delete', `/vendor/${id}`)
        .then(response => {
          console.log(response)
          if (response.data) {
            alert('OK')
          }
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}
</script>

<style scoped>
.z-header {
    color: #566787
}
.table-wrapper {
    padding: 20px 25px;
    margin: 30px 0;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.table-title {
    padding-bottom: 15px;
    background: #435d7d;
    color: #fff;
    padding: 16px 30px;
    margin: -20px -25px 10px;
    border-radius: 3px 3px 0 0;
}
.table-title .btn {
    color: #fff;
    float: right;
    font-size: 13px;
    min-width: 50px;
    border-radius: 2px;
    border: none;
    outline: none !important;
    margin-left: 10px;
    margin-top: 15px;
}
</style>
