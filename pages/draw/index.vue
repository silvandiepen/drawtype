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
