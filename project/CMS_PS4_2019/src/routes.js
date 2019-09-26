import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'
import CustomerView from './components/views/Customer.vue'
import CheckOutView from './components/views/CheckOut'
import VendorView from './components/views/Vendor'
import ItemView from './components/views/Items'
import PlayView from './components/views/Play'
import TransactionView from './components/views/Transaction'
// import UserView from './components/views/User'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Bảng điều khiển'}
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page', requiresAuth: true, is_admin: true}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers', requiresAuth: true}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
      },
      {
        path: 'play',
        component: PlayView,
        name: 'PlayPS',
        meta: {description: 'Hệ thống tính giờ chơi PS', requiresAuth: true}
      },
      {
        path: 'customers',
        component: CustomerView,
        name: 'Customer',
        meta: {description: 'List customers', requiresAuth: true}
      },
      {
        path: 'checkout/:id',
        component: CheckOutView,
        name: 'CheckOut',
        meta: {description: 'Thanh Toán Dịch vụ', requiresAuth: true}
      },
      {
        path: 'vendor',
        component: VendorView,
        name: 'Vendor',
        meta: {description: 'Nhà cung cấp', requiresAuth: true, is_admin: true}
      },
      {
        path: 'item',
        component: ItemView,
        name: 'Item',
        meta: {description: 'Danh sách dịch vụ', requiresAuth: true, is_admin: true}
      },
      {
        path: 'trans',
        component: TransactionView,
        name: 'Transaction',
        meta: {description: 'Giao dịch', requiresAuth: true}
      },
      {
        path: 'user',
        // component: UserView,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './components/views/User'),
        name: 'User',
        meta: {description: 'Quản lý Thành viên', requiresAuth: true}
      },
      {
        path: 'code',
        component: () => import(/* webpackChunkName: "about" */ './components/views/Mastercode'),
        name: 'MasterCode',
        meta: {description: 'Hệ thống mã quản lý hàng hóa, dịch vụ, tài sản, ...', requiresAuth: true}
      },
      {
        path: 'inventory',
        component: () => import(/* webpackChunkName: "about" */ './components/views/Inventory'),
        name: 'Inventory',
        meta: {description: 'Các hoạt động Nhập kho', requiresAuth: true}
      },
      {
        path: 'ps',
        component: () => import(/* webpackChunkName: "about" */ './components/views/ListPS'),
        name: 'ListPS',
        meta: {description: 'Quản lý máy PS', requiresAuth: true}
      },
      {
        path: 'chamcong',
        component: () => import(/* webpackChunkName: "about" */ './components/views/ChamCong'),
        name: 'ChamCong',
        meta: {description: 'Chấm công Đi làm / Về', requiresAuth: true}
      },
      {
        path: 'user/detail/:id',
        component: () => import(/* webpackPrefetch: true */ './components/views/UserDetail'),
        name: 'UserDetail',
        meta: {description: 'User profile', requiresAuth: true}
      },
      {
        path: 'report/bcnxt',
        component: () => import(/* webpackPrefetch: true */ './components/views/ReportNXT'),
        name: 'ReportNXT',
        meta: {description: 'Nhập xuất tồn kho', requiresAuth: true}
      },
      {
        path: 'tondauky',
        component: () => import(/* webpackPrefetch: true */ './components/views/TonDauky'),
        name: 'TonDauKy',
        meta: {description: 'Nhập tồn kho cuối kỳ sau kiểm kê thực tế, kiểm tra chênh lệch', requiresAuth: true}
      },
      {
        path: 'doanhthu',
        component: () => import(/* webpackPrefetch: true */ './components/views/DoanhThu'),
        name: 'DoanhThu',
        meta: {description: 'Báo cáo chi tiết Doanh thu theo tháng', requiresAuth: true, is_admin: true}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
