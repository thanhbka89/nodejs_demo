<template>
	<div class="d-flex flex-column sticky-footer-wrapper">
		<main class="flex-fill">
			<app-header></app-header>
			<message-component></message-component>

			<div class="container mt-3">
				<div class="row">
					<div class="col-md-12">
						<transition name="slide-fade" mode="out-in">
							<router-view></router-view>
						</transition>

						<!-- <div
							class="card panel-warning d-none d-sm-flex"
							id="reset-store-panel"
						>
							<div class="card-header">Admin Panel (Testing purpose)</div>
							<div class="card-body text-center">
								<button class="btn btn-warning">Reset Store</button>
							</div>
						</div> -->
					</div>
				</div>
			</div>
		</main>

		<app-footer></app-footer>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import MessageComponent from './components/common/MessageComponent.vue'
import ProductService from './services/ProductService'

export default {
	components: {
		appHeader: Header,
		MessageComponent,
		appFooter: Footer,
	},
	methods: {
		...mapActions(['getShoppingCart', 'listenToProductList', 'getProductList']),
		async getListProduct() {
			const result = await ProductService.find()
			console.log('[product]', { result })
		},
	},
	created() {
		let uid = this.$store.getters.currentUser.uid
    this.listenToProductList()
    // this.getProductList()
    this.getShoppingCart({ uid, currentCart: this.$store.getters.cartItemList })
    

		ProductService.healcheck()
			.then((response) => console.log('[healthcheck]', response))
			.catch((e) => console.log(e))
	},
	mounted() {
		// this.getListProduct()
	},
}
</script>

<style>
#reset-store-panel {
	position: fixed;
	bottom: 0px;
	right: 0px;
}
body,
.sticky-footer-wrapper {
	min-height: 100vh;
}
.flex-fill {
	flex: 1 1 auto;
}
.slide-fade-enter-active {
	transition: all 0.2s ease;
}
.slide-fade-leave-active {
	transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-active {
	padding-left: 10px;
	opacity: 0;
}
footer {
	height: 40px;
	color: #666;
	padding: 10px 0 10px 0;
	font-size: 85%;
}
footer a {
	color: #999;
}
footer a:hover {
	color: #efefef;
}
@media (max-width: 576px) {
	footer {
		height: 50px;
	}
}
</style>
