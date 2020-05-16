<template>
  <footer class="main-footer">
     <!-- To the right -->
    <div class="pull-right hidden-xs">
      <i class="fa fa-phone"></i> HOTLINE: <strong>{{ phone }}</strong>
    </div>
    
    <!-- Default to the left -->
    <strong>Copyright &copy; {{ year }}
    <a href="javascript:;">PS BaO NguyeN</a></strong>
  </footer>
</template>

<script>
export default {
  name: 'DashFooter',
  data: function () {
    return {
      year: new Date().getFullYear(),
      phone: this.$myPhone
    }
  }
}
</script>
