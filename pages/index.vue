<template>
	<main class="page page--home">
		<Logo />
		<!-- <NuxtLink class="button" to="/draw">Start Your Font</NuxtLink> -->
	</main>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '@/components/Logo.vue';
export default Vue.extend({
	components: {
		Logo
	},
	layout: 'home'
});
</script>

<style lang="scss">
@import '~tools';
.page {
	&--home {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
}
</style>
