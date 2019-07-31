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
                        <td class="col-md-2">Call of Duty:</td>
                        <td class="col-md-9">455-981-221</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Need for Speed IV:</td>
                        <td>247-925-726</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.col -->
              </div>
            </section>
          </v-tab>

          <v-tab title="Point" icon="fa fa-money">
            Second tab content {{ user_id }}
          </v-tab>

          <v-tab title="History" icon="fa fa-history">
            Third tab content {{ user_id }}
          </v-tab>
        </vue-tabs>
      </div>
    </div>
  </section>
</template>

<script>
// import api from '@/api'
import {VueTabs, VTab} from 'vue-nav-tabs/dist/vue-tabs.min.js'

export default {
  name: 'ChamCong',
  data() {
    return {
      user_id: this.$route.params.id
    }
  },
  async created() {
  },
  methods: {
    showToast() {
      this.$swal({
        type: 'success',
        title: 'Cập nhật thành công',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
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

