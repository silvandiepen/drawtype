<template>
	<main class="page-draw">
		<GlyphOverviewHeader />
		<GlyphOverview />
		<FontSettings />
	</main>
</template>
<script>
import { GlyphOverview, GlyphOverviewHeader, FontSettings } from '@/components';

export default {
	components: {
		GlyphOverviewHeader,
		GlyphOverview,
		FontSettings
	},
	created() {
		this.$store.dispatch('glyphs/setCharacterSets');
	},
	mounted() {
		setTimeout(() => {
			this.$store.dispatch('ui/setLoading', false);
		}, 500);
	}
};
</script>
