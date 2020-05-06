<template>
	<header id="header" class="header">
		<h3 class="header__logo">
			<NuxtLink to="/"> <Logo /> </NuxtLink>
		</h3>
		<NavigationTrigger />
		<NavigationMenu />
	</header>
</template>

<script lang="ts">
import Vue from 'vue';
import NavigationMenu from '@/components/navigation/menu.vue';
import NavigationTrigger from '@/components/navigation/trigger.vue';
import Logo from '@/components/Logo.vue';
export default Vue.extend({
	components: {
		NavigationMenu,
		NavigationTrigger,
		Logo
	},
	data: () => ({
		projectName: 'DrawType'
	})
});
</script>

<style lang="scss">
@import '~tools';

.header {
	position: relative;
	top: 0;
	left: 0;
	z-index: 1;
	display: flex;
	justify-content: space-between;
	width: 100%;
	background-color: black;
	color: white;
	text-align: center;
	padding: 1em;
	&__logo {
		z-index: 2;
		font-size: 1.5rem;
		line-height: 1.5rem;
		padding: 1rem 0;
		svg {
			height: 2em;
		}
		a {
			text-decoration: none;
		}
	}
}
</style>
