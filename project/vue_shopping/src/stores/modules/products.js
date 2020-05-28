import ProductService from '../../services/ProductService'

export const PAGINATION = 'pagination'

export const SET_PAGINATION = 'set_pagination'
export const SET_DATA = 'set_data'

export const FETCH_PRODUCT = 'load_products'

const state = {
	isLoading: true,
	productList: [
		// {
		// 	id: 1,
		// 	title: 'macbook Retina 13.3" ME662 (2013)',
		// 	thumbnail_url: 'http://media.bizwebmedia.net//sites/72783/data/images/2016/2/4713895macbook_pro_retina.png',
		// 	price: 999.9,
		// 	quantity: 10,
		// 	category: "macbook",
		// 	description: "3.0GHz Dual-core Haswell Intel Core i5 Turbo Boost up to 3.2 GHz, 3MB L3 cache 8GB (two 4GB SO-DIMMs) of 1600MHz DDR3 SDRAM"
		// },{
		// 	id: 2,
		// 	title: 'Macbook Pro 13.3" Retina MF841LL/A',
		// 	thumbnail_url: 'http://media.bizwebmedia.net//sites/72783/data/images/2015/11/3220113retina13.jpg',
		// 	price: 1199.9,
		// 	quantity: 15,
		// 	category: "macbook",
		// 	description: 'Macbook Pro 13.3" Retina MF841LL/A Model 2015 Option Ram Care 12/2016'
		// }
	],
	productVls: [],
	pagination: {
		page: 1,
		limit: 10,
		totalPages: 0,
	},
}

const mutations = {
	UPDATE_PRODUCT_LIST(state, productList) {
		state.productList = productList
		state.isLoading = false
	},
	UPDATE_PRODUCT_LIST_VLS(state, productList) {
		state.productVls = productList
		state.isLoading = false
	},
	[SET_PAGINATION](state, pagination) {
		state.pagination = pagination
	},

	[SET_DATA](state, data) {
		state.productVls = data
		state.isLoading = false
	},
}

const actions = {
	async [FETCH_PRODUCT]({ commit }, payload) {
		const data = await ProductService.find({
			...state.pagination,
			...payload,
		})
		console.log('[bbb]', data.data.data)
		commit(SET_DATA, data.data.data.docs)
		commit(SET_PAGINATION, {
			page: data.data.data.page,
			limit: data.data.data.limit,
			totalPages: data.data.data.totalPages,
		})
	},
}

const getters = {
	products: (state) => {
		return state.productList
	},
	isProductLoading: (state) => {
		return state.isLoading
	},
	productsVlso: (state) => {
		return state.productVls
	},
	productPagination: (state) => {
		return state.pagination
	},
}

export default {
	state,
	mutations,
	actions,
	getters,
}
