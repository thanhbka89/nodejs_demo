<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png" />

		<div v-show="jwt !== null">
			<p>Returned JWT: {{ jwt }}</p>
			<p>
				<a @click="logOut" href="#">Log Out</a>
			</p>
		</div>

		<form class="form-signin" @submit.prevent="login" v-show="jwt == null">
			<label for="inputUsername">Username</label>
			&nbsp;
			<input
				v-model="username"
				type="text"
				id="inputUsername"
				placeholder="Username"
				required
				autofocus
			/>
			<br />
			<br />
			<label for="inputPassword">Password</label>
			&nbsp;
			<input
				v-model="password"
				type="password"
				id="inputPassword"
				placeholder="Password"
				required
			/>
			<p>
				<input type="submit" value="Sign In" />
			</p>
		</form>
	</div>
</template>

<script>
// https://dev.to/nosrednakram/socket-io-13ga

export default {
	name: 'vue',
	components: {},
	data() {
		return {
			username: 'admin',
			password: 'passwd',
			jwt: null,
		}
	},
	created() {
		// eslint-disable-next-line no-console
		console.log('loaded')
	},
	sockets: {
		connect: function() {
			// eslint-disable-next-line no-console
			console.log('socket connected')
		},
		auth: function(response) {
			// eslint-disable-next-line no-console
			console.log('[auth]', response)
			this.jwt = response.jwt
		},
		disconnect() {
			// eslint-disable-next-line no-console
			console.log('socket disconnected')
		},
	},
	methods: {
		login() {
			if (this.$socket.disconnected) {
				this.$toasted.global
					.appError({
						message: 'You are not connected to the server!',
					})
					.goAway(1200)
			} else {
				this.$socket.emit('authenticate', {
					data: JSON.stringify({
						username: this.username,
						password: this.password,
					}),
				})
			}
		},
		logOut() {
			this.jwt = null
			this.$toasted.global
				.appSuccess({
					message: 'Locally Logged Out!',
				})
				.goAway(1200)
		},
	},
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
