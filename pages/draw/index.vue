<template>
	<main class="page-draw">
		<div class="heading">
			<div></div>
			<div><input v-model="fontTitle" class="font-title" type="text" /></div>
			<SettingsPanel class="heading__settings" />
		</div>
		<GlyphOverview />
	</main>
</template>
<script>
import { SettingsPanel, GlyphOverview } from '@/components';

export default {
	components: {
		SettingsPanel,
		GlyphOverview
	},
	created() {
		this.$store.dispatch('glyphs/setCharacterSets');
	}
};
</script>
<style lang="scss">
@import '~tools';
.heading {
	position: sticky;
	top: 0;
	z-index: 5;
	display: flex;
	justify-content: space-between;
	padding: 1em;
	> div {
		width: 33.33%;
	}
}
.font-title {
	width: 100%;
	border: none;
	outline: 1px solid transparent;
	text-align: center;
	padding: 0.5em;
	@include heading-h3();
	&:focus {
		outline: 1px solid currentColor;
	}
}
</style>
