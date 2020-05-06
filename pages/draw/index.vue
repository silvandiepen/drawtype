<template>
	<main class="page-draw">
		<GlyphOverviewHeader />
		<GlyphOverview />
	</main>
</template>
<script>
import { GlyphOverview, GlyphOverviewHeader } from '@/components';

export default {
	components: {
		GlyphOverviewHeader,
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
