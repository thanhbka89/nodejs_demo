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

            <div class="box-body form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 z-label">Tên quán:</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="option.name" placeholder="Tên quán ..."/>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2">Địa chỉ:</label>
                <div class="col-sm-10">
                  <textarea class="form-control" v-model="option.address"></textarea>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 z-label">Số điện thoại:</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="option.phone" placeholder="Số điện thoại ..."/>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 z-label">Mã số thuế:</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="option.vat" placeholder="Mã số thuế ..."/>
                </div>
              </div>
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
import { CommonSetting, LocalStorageSetting } from '@/settings'
const SettingR = Factory.get('setting')
const KEY_COMPANY = CommonSetting.KEY_COMPANY
const KEY_SETTING = LocalStorageSetting.KEY_SETTING
export default {
  name: 'Settings',
  data() {
    return {
      item: {},
      option: {},
      lsSetting: {}
    }
  },
  computed: {
    optionJson() {
      return JSON.stringify(this.option) // convert object to string
    }
  },
  async created() {
    await Promise.all([
      this.find()
    ])
    try {
      const settings = JSON.parse(window.localStorage.getItem(KEY_SETTING) || 'null')
      if (settings) {
        this.lsSetting = settings
      }
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    modify() {
      if (this.item.id) {
        this.update()
      } else {
        this.insert()
      }

      this.lsSetting[KEY_COMPANY] = this.item
      this.saveLocalStorage()
    },
    async insert() {
      let type = 'success'
      let msg = ''
      this.item.name = KEY_COMPANY
      this.item.option = this.optionJson
      const result = await SettingR.create(this.item)
      if (!result.data.success) {
        type = 'error'
        msg = result.data.data.code
      }
      this.showToast(type, msg)
    },
    async update() {
      let type = 'success'
      let msg = ''
      this.item.option = this.optionJson
      const result = await SettingR.update(this.item.id, this.item)
      if (!result.data.success) {
        type = 'error'
        msg = result.data.data.code
      }
      this.showToast(type, msg)
    },
    async find() {
      try {
        const result = await SettingR.getByName(KEY_COMPANY)
        if (result.data.data) {
          this.item = result.data.data
          let option = {}
          try {
            option = JSON.parse(result.data.data.option) // convert string to object
          } catch (e) {
            console.error(e)
          }

          this.option = option
        }
      } catch (err) {
        console.error(err)
      }
    },
    saveLocalStorage() {
      window.localStorage.setItem(KEY_SETTING, JSON.stringify(this.lsSetting))
    },
    showToast(type = 'success', message = '') {
      this.$swal({
        type: type,
        title: message || `${this.item.id ? 'Cập nhật' : 'Thêm mới'} thành công`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000
      })
    }
  }
}
</script>

<style>
.datetime-picker input {
  height: 4em !important;
}
</style>
