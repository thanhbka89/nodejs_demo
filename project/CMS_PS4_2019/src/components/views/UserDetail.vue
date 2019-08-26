<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <vue-tabs active-tab-color="#9b59b6" active-text-color="white">
          <v-tab title="User Profile" icon="fa fa-user-secret">
            <section class="userdetail">
              <div class="row">
                <div class="col-xs-12 table-responsive">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="col-md-1"></td>
                        <td class="col-md-2">Username:</td>
                        <td class="col-md-9 text-bold">{{ this.user.username}}</td>
                      </tr>
                      <tr>
                        <td class="col-md-1"></td>
                        <td class="col-md-2">Họ tên:</td>
                        <td class="col-md-9 text-bold">{{ this.user.fullname}}</td>
                      </tr>
                      <tr>
                        <td class="col-md-1"></td>
                        <td class="col-md-2">Nickname:</td>
                        <td class="col-md-9 text-bold">{{ this.user.nickname}}</td>
                      </tr>
                      <tr>
                        <td class="col-md-1"></td>
                        <td class="col-md-2">Số điện thoại:</td>
                        <td class="col-md-9 text-bold">{{ this.user.phone}}</td>
                      </tr>
                      <tr>
                        <td class="col-md-1"></td>
                        <td class="col-md-2">Địa chỉ:</td>
                        <td class="col-md-9 text-bold">{{ this.user.address}}</td>
                      </tr>
                      <tr>
                        <td class="col-md-1"></td>
                        <td class="col-md-2">Khách hàng:</td>
                        <td class="col-md-9 text-bold">{{ type }}</td>
                      </tr>
                      <tr>
                        <td class="col-md-1"></td>
                        <td class="col-md-2">Vai trò:</td>
                        <td class="col-md-9 text-bold">{{ role }}</td>
                      </tr>
                      <tr>
                        <td class="col-md-1"></td>
                        <td class="col-md-2">Ngày tạo:</td>
                        <td class="col-md-9 text-bold">{{ this.user.created_by}} - {{ this.user.created_at | fDateTime}}</td>
                      </tr>
                      <tr>
                        <td class="col-md-1"></td>
                        <td class="col-md-2">Ngày cập nhật:</td>
                        <td class="col-md-9 text-bold">{{ this.user.updated_by}} - {{ this.user.updated_at | fDateTime}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.col -->
              </div>
            </section>
          </v-tab>

          <v-tab title="Point" icon="fa fa-money">
            Số phút đã tích được: <span class="text-bold">{{ point }}</span>
          </v-tab>

          <v-tab title="History" icon="fa fa-history">
            Lịch sử của người chơi <span class="text-bold">{{ this.user.username }}</span>
          </v-tab>
        </vue-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/api'
import { VueTabs, VTab } from 'vue-nav-tabs/dist/vue-tabs.min.js'
import { UserSetting } from '@/settings'

export default {
  name: 'UserDetail',
  data() {
    return {
      user_id: this.$route.params.id,
      user: {}
    }
  },
  computed: {
    point() {
      return this.user.diem_tich - this.user.diem_tieu
    },
    role() {
      return this.user.role === UserSetting.ROLE_ADMINISTRATOR ? 'Administrator'
        : (this.user.role === UserSetting.ROLE_EMPLOYEE ? 'Nhân viên' : 'Khách hàng')
    },
    type() {
      return this.user.type === UserSetting.TYPE_DIAMOND ? 'Diamond'
        : this.user.type === UserSetting.TYPE_VIP ? 'VIP'
        : this.user.type === UserSetting.TYPE_LOYAL ? 'Khách hàng thân thiết'
        : 'Khách hàng thông thường'
    }
  },
  async created() {
    await this.getUser()
  },
  methods: {
    async getUser() {
      try {
        const response = await api.request('get', `/user/action/${this.user_id}`)
        if (response.data.success) {
          this.user = response.data.data[0]
        }
      } catch (err) {
        console.error(err)
      }
    },
    showToast(type = 'success', message = '') {
      this.$swal({
        type: type,
        title: message || `Cập nhật thành công`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000
      })
    }
  },
  components: {
    VueTabs,
    VTab
  }
}
</script>

<style scoped>
</style>

