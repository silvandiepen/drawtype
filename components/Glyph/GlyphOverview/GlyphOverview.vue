<template>
	<main class="glyphs__overview">
		<GlyphSet
			v-for="(glyphset, idg) in glyphsets"
			:key="idg"
			:set="glyphset.id"
			:style="`--view-size:${viewSize}em; --view-opacity:${viewOpacity / 100};`"
		/>
	</main>
</template>

<script>
import GlyphSet from '@/components/Glyph/GlyphSet/GlyphSet.vue';

export default {
	components: {
		GlyphSet
	},
	computed: {
		glyphsets: {
			get() {
				return this.$store.getters['glyphs/getActiveCharacterSets'];
			}
		},
		viewSize: {
			get() {
				return this.$store.getters['view/getSize'];
			}
		},
		viewOpacity: {
			get() {
				return this.$store.getters['view/getOpacity'];
			}
		}
	},
	created() {
		this.$store.dispatch('glyphs/setCharacterSets');
	}
};
</script>
<style lang="scss">
@import '~tools';
.glyphs {
	&__overview {
	}
}
</style>
