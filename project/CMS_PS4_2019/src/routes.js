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
import UserView from './components/views/User'

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
        meta: {description: 'Overview of environment'}
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
        meta: {description: 'Danh sách máy PS', requiresAuth: true}
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
        meta: {description: 'Thanh Toán', requiresAuth: true}
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
        component: UserView,
        name: 'User',
        meta: {description: 'Thành viên', requiresAuth: true}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
