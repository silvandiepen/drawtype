<template>
	<div class="layout layout-default" :class="colorMode">
		<LayoutHeader />
		<nuxt />
		<LayoutFooter />
		<Loading />
	</div>
</template>

<script>
import LayoutHeader from '~/components/layout/header.vue';
import LayoutFooter from '~/components/layout/footer.vue';
import Loading from '~/components/Loading.vue';
export default {
	components: {
		LayoutHeader,
		LayoutFooter,
		Loading
	},
	computed: {
		colorMode() {
			return this.$store.state.ui.colorMode;
		}
	}
};
</script>
