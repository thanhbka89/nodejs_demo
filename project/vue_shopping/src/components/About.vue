<template>
	<div class="event-handling">
		<form @submit.prevent="sayWelcome">
			<button type="submit">Submit</button>
		</form>

		<div @click="alertHello">
			<button @click.stop="alertWelcome">CLick</button>
		</div>
	</div>
</template>

<script>
export default {
	created() {
		console.log('[Created.About]')
	},
	mounted() {
		console.log('[Mounted.About]')
	},
	methods: {
		sayWelcome() {
			alert(1)
		},
		alertHello() {
			alert('Hello')
		},
		alertWelcome() {
			alert('Welcome')
		},
	},
}
</script>

<style lang="scss" scoped></style>
