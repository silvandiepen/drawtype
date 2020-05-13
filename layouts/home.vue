<template>
	<div class="layout layout-default" :class="colorMode">
		<nuxt />
		<Footer />
		<Loading />
	</div>
</template>

<script>
import { Footer } from '@/components';
import Loading from '~/components/Loading.vue';
export default {
	components: {
		Footer,
		Loading
	},
	computed: {
		colorMode() {
			return this.$store.state.ui.colorMode;
		}
	}
};
</script>
