<template>
	<main class="page page--home">
		<Logo />
		<button class="button" @click="openDialog">
			Start Your Font
		</button>
		<FontSettings />
	</main>
</template>

<script lang="ts">
import Vue from 'vue';
import { FontSettings } from '@/components';
import Logo from '@/components/Logo.vue';

export default Vue.extend({
	components: {
		Logo,
		FontSettings
	},
	layout: 'home',
	created() {
		this.$store.dispatch('glyphs/setCharacterSets');
	},
	methods: {
		openDialog() {
			this.$store.dispatch('ui/setActiveSettings', true);
		}
	}
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
