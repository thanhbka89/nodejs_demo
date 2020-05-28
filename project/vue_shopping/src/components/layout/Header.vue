<template>
	<nav class="navbar sticky-top navbar-expand-sm navbar-dark bg-dark" role="navigation">
		<div class="container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<router-link to="/" class="navbar-brand mr-auto mb-0 h1">VLSo Store</router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarTop"
				aria-controls="navbarTop"
				aria-expanded="false"
				aria-label="Toggle navigation"
				@click="toggleNavbar"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div
				class="collapse navbar-collapse"
				id="navbarTop"
				:class="{ show: isNavOpen }"
			>
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<router-link to="/products" class="nav-link"
							>All Products</router-link
						>
					</li>
				</ul>
				<form class="form-inline my-2 my-lg-0">
					<input
						class="form-control mr-sm-2"
						type="search"
						placeholder="Search"
						aria-label="Search"
					/>
					<button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click.prevent="fSearch">
						Search
					</button>
				</form>
				<ul class="nav navbar-nav">
					<router-link
						to="/login"
						tag="li"
						v-if="!isLoggedIn"
						class="nav-item"
						active-class="active"
					>
						<a class="nav-link">Login</a>
					</router-link>
					<li v-if="isLoggedIn" class="li-pointer nav-item">
						<a @click="logout" class="nav-link">Logout {{ userEmail }}</a>
					</li>
					<router-link
						to="/register"
						tag="li"
						v-if="!isLoggedIn"
						class="nav-item"
						active-class="active"
					>
						<a class="nav-link">Register</a>
					</router-link>
					<li>
						<router-link
							to="/cart"
							class="btn btn-success navbar-btn"
							tag="button"
						>
							<i class="fa fa-shopping-cart mr-1">
								<span class="badge badge-light ml-2"
									>{{ numItems }} ($ {{ cartValue }})
								</span>
							</i>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<!-- /.container -->
	</nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	data() {
		return {
			isNavOpen: false,
		}
	},
	computed: {
		...mapGetters(['isLoggedIn', 'cartValue', 'currentUser', 'cartItemList']),
		numItems() {
			return this.cartItemList.reduce((total, item) => {
				total += item.quantity
				return total
			}, 0)
		},
		userEmail() {
			return this.isLoggedIn ? this.currentUser.email : ''
		},
	},
	methods: {
		...mapActions(['logout']),
		toggleNavbar() {
			this.isNavOpen = !this.isNavOpen
		},
		fSearch() {
			alert('S')
		}
	},
}
</script>

<style scoped lange="sass">
.navbar-btn a {
	color: white;
}

.li-pointer {
	cursor: pointer;
}

.li-pointer:hover {
	cursor: pointer;
}
</style>
