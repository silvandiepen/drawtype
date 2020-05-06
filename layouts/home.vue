<template>
	<div class="layout layout-default" :class="colorMode">
		<nuxt />
		<LayoutFooter />
	</div>
</template>

<script>
import LayoutFooter from '~/components/layout/footer.vue';

export default {
	components: {
		LayoutFooter
	},
	computed: {
		colorMode() {
			return this.$store.state.ui.colorMode;
		}
	}
};
</script>
