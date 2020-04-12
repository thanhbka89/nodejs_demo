import API_VL from '../helpers/api'
import * as UserService from '../models/mongo/user.service'

export const getToken = async (
  username = process.env.GETFLY_USERNAME,
  password = process.env.GETFLY_PASSWORD
) => {
  const response = { success: false, data: null }
  try {
    const result = await API_VL.request('post', `/authenticate/login`, {
      username,
      password,
    })
    response.success = true
    response.data = result.data
  } catch (e) {
    response.data = e.response.data
  }

  return response
}

/** Get list users active VL on CRM */
export const getUsers = async () => {
  return await API_VL.request('get', `/crm/account/list_accounts`)
}

/** Get list users active, inactive VL on CRM */
export const getAllUsers = async () => {
  return await API_VL.request('get', `/users/selectize`)
}

/** Get detail user
 * @id(number)
 */
export const getUserById = async (userId) => {
  return await API_VL.request('get', `/hrm/contacts/about/?user_id=${userId}`)
}

/** Get list departments */
export const getDeps = async () => {
  return await API_VL.request('get', `/department/list`)
}

/** List nganh KD */
export const getIndustries = async () => {
  return await API_VL.request('get', `/crm/account/industries`)
}

/** List Orders, default get Sale Orders
 * @order_type: 1 -> PO , Don mua hang
 *              2 -> SO, Don ban hang
 * @choose_time: ALL|TODAY|YESTERDAY|THIS_WEEK|LAST_WEEK|THIS_MONTH|LAST_MONTH|THIS_YEAR
 */
export const getOrdersV1 = async ({
  page = 1,
  limit = 50,
  order_type = 2,
  choose_time = 'ALL',
}) => {
  return await API_VL.request(
    'get',
    `/crm/order/filters?p=${page}&limit=${limit}&order_type=${order_type}&choose_time=${choose_time}`
  )
}

/** Lấy thông tin chi tiết về một đơn hàng
 * @param(String) : 29346
 * @return: order, list all user (active, inactive)
 */
export const getOrderDetailV1 = async (orderId) => {
  return await API_VL.request('get', `/crm/order/detail?order_id=${orderId}`)
}

//======================== API KEY SECRET =============================

/** Get list customers */
export const getCustomers = async ({ page = 1, limit = 50 }) => {
  return await API_VL.request(
    'get',
    `/api/v3/accounts/?page=${page}&limit=${limit}`
  )
}

/** Get list group customer */
export const getGroupCustomer = async () => {
  return await API_VL.request('get', `/api/v3/account/types`)
}

/** List nhom nganh KD */
export const getIndustriesV3 = async () => {
  return await API_VL.request('get', `/api/v3/account/industries`)
}

/** Đếm số đơn hàng của 1 khách hàng theo các trạng thái --> Test NOT OK*/
export const getOrderOfCustomerByStatus = async (userId) => {
  return await API_VL.request(
    'get',
    `/api/v3/account/${userId}/count_orders_status/`
  )
}

/** Lấy ra danh sách khách hàng thêm mới hoặc cập nhật từ thời gian chỉ định đến hiện tại
 * @date : 2020-04-21 || unix time
 * @limit(number)
 */
export const getCustomerModified = async ({
  date = '1585699200',
  limit = 50,
}) => {
  return await API_VL.request(
    'get',
    `/api/v3/accounts/sync?last_sync=${date}&limit=${limit}`
  )
}

/** Lấy ra danh sách khách hàng đã xóa trong khoảng thời gian xác định đến hiện tại
 * @date : 2020-04-21 || unix time
 * @limit(number)
 */
export const getCustomerDeleted = async ({ date = '', limit = 50 }) => {
  return await API_VL.request(
    'get',
    `/api/v3/accounts/deleted_ids?last_sync=${date}&limit=${limit}`
  )
}

/** Lấy thông tin chi tiết về một đơn hàng
 * @param(String) : DH29346
 */
export const getOrderDetail = async (orderId) => {
  return await API_VL.request('get', `/api/v3/orders/${orderId}`)
}

/** Lấy ra tất cả danh mục sản phẩm không phân trang
 * @parent_id 	0 	Lọc theo danh mục cha
 * @level 		    Lọc các danh mục cùng cấp
 */
export const getCategories = async ({ parent_id = 0, level = '' }) => {
  return await API_VL.request(
    'get',
    `/api/v3/products/categories/?parent_id=${parent_id}&level=${level}`
  )
}

/** Danh sách sản phẩm
 * @category_id 	0 	Lọc theo danh mục sản phẩm
 * @grap 	    false 	Nếu lọc theo danh mục sản phẩm thì tham số này cho phép lấy cả sản phẩm thuộc danh mục con của danh mục cần tìm kiếm
 */
export const getProducts = async ({ category_id = 0, grap = '' }) => {
  return await API_VL.request(
    'get',
    `/api/v3/products/?category_id=${category_id}&grap=${grap}`
  )
}

/** Chi tiết sản phẩm */
export const getProductDetail = async (prodId) => {
  return await API_VL.request('get', `/api/v3/products/${prodId}`)
}

/** Lấy danh sách các đơn vị tính liên quan đến sản phẩm */
export const getProductUnit = async () => {
  return await API_VL.request('get', `/api/v3/products/units`)
}

/** Lấy ra nguồn gốc xuất xứ của sản phẩm */
export const getProductOrigin = async () => {
  return await API_VL.request('get', `api/v3/products/origins`)
}

/** Danh sách các hãng sản phẩm */
export const getProductManufacturer = async () => {
  return await API_VL.request('get', `/api/v3/products/manufacturers`)
}

/** Danh sách tỉnh/TP */
export const getProvinces = async (country_id = 1) => {
  return await API_VL.request(
    'get',
    `/api/v3/configs/provinces?country_id=${country_id}`
  )
}

/** Danh sách tỉnh/TP */
export const getDistricts = async (province_id = 1) => {
  return await API_VL.request(
    'get',
    `/api/v3/configs/districts?province_id=${province_id}`
  )
}

//============= JOBs =================
export const syncUser = async () => {
  let message = 'Done'
  try {
    const result = await getAllUsers()

    result.data.forEach((item) => {
      UserService.modify({ user_id: item.user_id }, item).then((res) =>
        console.log('Job ', res._id)
      )
    })
  } catch (e) {
    message = 'ERROR >> Sync users from GetFly CRM'
  }

  return message
}
