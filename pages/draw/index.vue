<template>
	<main class="page-draw">
		<div class="heading">
			Draw
			<SettingsPanel class="heading__settings" />
		</div>
		<div
			v-for="(glyphset, idg) in glyphsets"
			:key="idg"
			class="glyps__set"
			:style="`--glyph-size:${viewSize}em`"
		>
			<h3 class="glyphs__title">{{ glyphset.title }}</h3>
			<ul class="glyphs__list">
				<li
					v-for="(glyph, idx) in glyphset.data"
					:key="idx"
					class="glyphs__item"
				>
					<GlyphCanvas v-model="glyph.data" :glyph="glyph.glyph" />
				</li>
			</ul>
		</div>
	</main>
</template>
<script>
import { SettingsPanel } from '@/components';
import GlyphCanvas from '@/components/GlyphCanvas/GlyphCanvas.vue';

export default {
	components: {
		GlyphCanvas,
		SettingsPanel
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
		}
	},
	created() {
		this.$store.dispatch('glyphs/setCharacterSets');
	}
};
</script>
<style lang="scss">
.heading {
	position: sticky;
	top: 0;
	z-index: 5;
	display: flex;
	justify-content: space-between;
	padding: 1em;
}
.glyphs {
	&__title {
		position: sticky;
		top: 0;
		z-index: 2;
		background-color: white;
		padding: 1em 2em;
	}
	&__list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		background-color: rgba(255, 250, 245);
		padding: 2em;
		overflow: hidden;
	}
	&__item {
		width: var(--glyph-size, 10em);
		height: var(--glyph-size, 10em);
		padding: calc(var(--glyph-size, 10em) / 20);
		canvas {
			border: 1px solid rgba(0, 0, 0, 0.25);
			background-color: white;
		}
	}
}
</style>
