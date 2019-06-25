<template>
  <section class="content">
    <div class="row">
      <vendor-create v-if="showModal">
        <h3 slot="header" class="modal-title">
          {{item.id ? 'Update' : 'Create'}}
        </h3>
        <div slot="body">
          <div class="form-group">
              <label>Name:</label>
              <input type="text" class="form-control" v-model="item.name"/>
          </div>
          <div class="form-group">
              <label>Phone:</label>
              <input type="text" class="form-control" v-model="item.phone"/>
          </div>
          <div class="form-group">
							<label>Address:</label>
							<textarea class="form-control" v-model="item.address"></textarea>
						</div>
        </div>
        <div slot="footer">
          <button type="button" class="btn btn-outline-info" @click="closeModal()"> Close </button>
          <button type="button" class="btn btn-success" @click="modify()">Save Changes</button>
        </div>
      </vendor-create>
      <div class="col-xs-12">
        <button type="button" class="btn btn-success" @click="openModal()">Add Item</button>
        <index :openModal="openModal"></index>
      </div>
      
    </div>
  </section>
</template>

<script>
import api from '../../api'
import Index from '../widgets/vendor/Index'
import VendorCreate from '../widgets/Modal'

export default {
  name: 'Vendor',
  data() {
    return {
      showModal: false,
      item: {
        id: '',
        name: 'demo'
      }
    }
  },
  created() {

  },
  methods: {
    openModal(obj = {name: 'test'}) {
      this.item = obj
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    modify() {
      if (this.item.id) {
        this.update()
      } else {
        this.insert()
      }
    },
    insert() {
      api
        .request('post', '/vendor', this.item)
        .then(response => {
          console.log(response)
          if (response.data) {
            alert('OK')
            this.closeModal()
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    update() {
      api
        .request('put', `/vendor/${this.item.id}`, this.item)
        .then(response => {
          console.log(response)
          if (response.data) {
            alert('OK')
            this.closeModal()
          }
        })
        .catch(e => {
          console.error(e)
        })
    }
  },
  components: {
    Index,
    VendorCreate
  }
}
</script>

<style scoped>
</style>
