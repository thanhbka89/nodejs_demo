<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label :title="tooltip">{{ title }}
        <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
      </label>
      <button @click="submitFile()" class="btn btn-success">{{ buttonName }}</button>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data() {
    return {
      file: ''
    }
  },
  props: {
    title: {
      type: String,
      default: 'File'
    },
    tooltip: String,
    buttonName: {
      type: String,
      default: 'Submit'
    },
    method: {
      type: String,
      default: '/upload'
    }
  },
  methods: {
    async submitFile() {
      let formData = new FormData()
      formData.append('file', this.file)
      try {
        const response = await api.request('post', this.method,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        if (response.data.error_code) {
          this.showAlert(response.data.err_desc)
        } else {
          this.showToast('success', 'Upload thành công!')
          console.log('SUCCESS!!', response)
        }
      } catch (err) {
        this.showToast('error', 'Có lỗi xảy ra trong quá trình Upload')
        console.error('FAILURE!!', err)
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    showAlert(msg = null) {
      this.$swal(msg || 'Cảnh báo!')
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
  }
}
</script>
