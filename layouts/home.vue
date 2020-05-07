<template>
	<div class="layout layout-default" :class="colorMode">
		<nuxt />
		<LayoutFooter />
		<Loading />
	</div>
</template>

<script>
import LayoutFooter from '~/components/layout/footer.vue';
import Loading from '~/components/Loading.vue';

export default {
	components: {
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
