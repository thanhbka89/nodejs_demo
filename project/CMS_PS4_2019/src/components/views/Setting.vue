<template>
  <div>
    <h1 class="text-center">Settings</h1>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">Thông tin Quán</h3>
            </div>

            <div class="box-body">
              <div class="form-group">
                <label class="col-sm-2 z-label">Tên quán:</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="company.name" placeholder="Tên quán ..."/>
                </div>              
              </div>
              <br /><br />
              <div class="form-group">
                <label class="col-sm-2">Địa chỉ:</label>
                <div class="col-sm-10">
                  <textarea class="form-control" v-model="company.address"></textarea>
                </div>
              </div>
              <br /><br />
              <div class="form-group">
                <label class="col-sm-2 z-label">Số điện thoại:</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="company.phone" placeholder="Số điện thoại ..."/>
                </div>              
              </div>
              <br />
            </div>
            <!-- /.box-body -->
          </div>
        </div>
        <div class="col-xs-12">
          <button type="button" class="btn btn-success" @click="modify">Save Changes</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Factory from '@/repositories/RepositoryFactory'
const SettingR = Factory.get('setting')

export default {
  name: 'Settings',
  data() {
    return {
      company: {}
    }
  },
  computed: {
    datetime () {
      return new Date()
    }
  },
  async created() {
    const result = await SettingR.get()
    console.log(result)
  },
  methods: {
    clearInput (vueModel) {
      vueModel = ''
    },
    modify() {
      alert(123)
    }
  }
}
</script>

<style>
.datetime-picker input {
  height: 4em !important;
}
</style>
