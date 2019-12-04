<template>
  <ul class="sidebar-menu">
    <li class="header">HOME</li>
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-tachometer"></i>
        <span class="page">Dashboard</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/play">
      <a>
        <i class="fa fa-television text-lime"></i>
        <span class="page">Máy PS</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/trans">
      <a>
        <i class="fa fa-fighter-jet text-maroon"></i>
        <span class="page"> Giao dịch</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/user">
      <a>
        <i class="fa fa-user-plus text-light-blue"></i>
        <span class="page"> DS thành viên</span>
      </a>
    </router-link>
    <!-- <router-link tag="li" class="pageLink" to="/chamcong">
      <a>
        <i class="fa fa-calendar-check-o text-olive"></i>
        <span class="page"> Chấm công</span>
      </a>
    </router-link> -->

    <template v-if="is_admin">
    <li class="header">CÀI ĐẶT</li>
    <router-link tag="li" class="pageLink" to="/code">
      <a>
        <i class="fa fa-qrcode text-aqua"></i>
        <span class="page"> Master Code</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/item">
      <a>
        <i class="fa fa-shopping-cart text-red"></i>
        <span class="page"> DS Dịch vụ</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/ps">
      <a>
        <i class="fa fa-futbol-o text-orange"></i>
        <span class="page"> DS máy PS</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/tondauky">
      <a>
        <i class="fa fa-file-excel-o text-orange"></i>
        <span class="page"> Nhập tồn cuối kỳ</span>
      </a>
    </router-link>

    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span class="treeview-title">Cấu hình chung</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="/setting">
            <i class="fa fa-cog"></i> Cài đặt thông tin quán
          </a>
        </li>
        <li>
          <a href="/setting_checkout">
            <i class="fa fa-cog"></i> Cài đặt Thanh toán
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-cog"></i> Cài đặt khác
          </a>
        </li>
      </ul>
    </li>
    </template>

    <template v-if="is_admin">
    <li class="header">BÁO CÁO</li>
    <router-link tag="li" class="pageLink" to="/report/bcnxt">
      <a>
        <i class="fa fa-list text-aqua"></i>
        <span class="page"> Nhập xuất tồn kho</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-line-chart text-aqua"></i>
        <span class="page"> Chart Biến động đơn giá</span>
      </a>
    </router-link>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span class="treeview-title">Report</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="/doanhthu">
            <i class="fa fa-file-word-o"></i> BC Doanh thu
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-picture-o"></i> BC Thu chi
          </a>
        </li>
        <li>
          <a href="/history_login">
            <i class="fa fa-file-pdf-o"></i> BC Lịch sử login
          </a>
        </li>
      </ul>
    </li>
    </template>

    <template v-if="is_admin">
    <li class="header">QUẢN LÝ</li>
    <!-- <router-link tag="li" class="pageLink" to="/customers">
      <a>
        <i class="fa fa-users text-fuchsia"></i>
        <span class="page"> DS khách hàng</span>
      </a>
    </router-link> -->
    <router-link tag="li" class="pageLink" to="/shops">
      <a>
        <i class="fa fa-sitemap text-green"></i>
        <span class="page"> DS Shops</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/vendor">
      <a>
        <i class="fa fa-car text-green"></i>
        <span class="page"> DS Nhà cung cấp</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/inventory">
      <a>
        <i class="fa fa-university text-yellow"></i>
        <span class="page"> QL Nhập kho</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/thuchi">
      <a>
        <i class="fa fa-balance-scale text-yellow"></i>
        <span class="page"> Nhập Thu Chi</span>
      </a>
    </router-link>
    </template>
  </ul>
</template>

<script>

export default {
  name: 'SidebarMenu',
  data() {
    return {
      isAdmin: this.$store.getters.isAdmin
    }
  },
  computed: {
    is_admin() {
      return this.$store.getters.isAdmin
    }
  }
}
</script>

<style>
/* override default */
.sidebar-menu > li > a {
  padding: 12px 15px 12px 15px;
}

.sidebar-menu li.active > a > .fa-angle-left,
.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.treeview-title {
  z-index: 1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}
</style>
