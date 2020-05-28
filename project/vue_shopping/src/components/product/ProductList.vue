<template>
	<div class="container" :class="{ loadingItem: isProductLoading }">
		<div class="row text-center" v-if="isProductLoading">
			<rotate-loader
				:loading="isProductLoading"
				:color="loaderColor"
				:size="loaderSize"
			></rotate-loader>
		</div>
		<div v-else class="row action-panel">
			<div class="col-12">
				<div class="btn-group btn-group-sm pull-right">
					<button
						id="list"
						class="btn btn-outline-dark"
						@click.prevent="changeDisplay(true)"
					>
						<i class="fa fa-list" aria-hidden="true"></i> List
					</button>
					<button
						id="grid"
						class="btn btn-outline-dark"
						@click.prevent="changeDisplay(false)"
					>
						<i class="fa fa-th" aria-hidden="true"></i> Grid
					</button>
				</div>
			</div>
		</div>

		<div class="row" v-if="!isProductLoading">
			<app-product-item
				v-for="prod in productsVlso"
				:item="prod"
				:key="prod.id"
				:displayList="displayList"
			></app-product-item>
		</div>

		<div class="clearfix">
			<paginate v-if='!isProductLoading'
				v-model="productPagination.page"
				:page-count="totalPage"
				:margin-pages="2"
				:page-range="3"
				:click-handler="paginateCallback"
				:container-class="'pagination justify-content-center'"
				:page-class="'page-item'"
				:page-link-class="'page-link'"
				:prev-class="'page-item'"
				:prev-link-class="'page-link'"
				:next-class="'page-item'"
				:next-link-class="'page-link'"
				:break-view-class="'break-view'"
				:break-view-link-class="'break-view-link'"
				:first-last-button="true"
			></paginate>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProductItem from './ProductItemVls.vue'
import RotateLoader from 'vue-spinner/src/RotateLoader.vue'
import Paginate from 'vuejs-paginate'

export default {
	data() {
		return {
			loaderColor: '#5cb85c',
			loaderSize: '15px',
			displayList: false,
		}
	},
	computed: {
		...mapGetters(['productsVlso', 'isProductLoading', 'productPagination']),
		totalPage() {
			return this.productPagination.totalPages
		},
	},
	components: {
		appProductItem: ProductItem,
		RotateLoader,
		Paginate,
	},
	created() {
		this.paginateCallback()
	},
	methods: {
		...mapActions(['load_products']),
		async paginateCallback(page = 1) {
			this.load_products({ page, limit: 99 })
		},
		changeDisplay(isList) {
			this.displayList = isList
		},
	},
}
</script>

<style scoped lange="sass">
.loadingItem {
	align-items: center;
	justify-content: center;
	display: flex;
}

.action-panel {
	margin-bottom: 10px;
	margin-right: 5px;
}
</style>
