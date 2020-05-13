<template>
	<div class="layout layout-default" :class="colorMode">
		<Header />
		<nuxt />
		<Footer />
		<Loading />
	</div>
</template>

<script>
import { Header, Footer } from '@/components';
import Loading from '~/components/Loading.vue';
export default {
	components: {
		Header,
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
