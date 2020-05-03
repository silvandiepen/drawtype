<template>
	<main class="page-draw">
		<div class="heading">
			Draw
			<div class="heading__settings">
				<BrushSettings />
				<ViewSettings />
			</div>
		</div>
		<div v-for="(glyphset, idg) in glyphsets" :key="idg" class="glyps__set">
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
import { BrushSettings, ViewSettings } from '@/components';
import GlyphCanvas from '@/components/GlyphCanvas/GlyphCanvas.vue';

export default {
	components: {
		GlyphCanvas,
		BrushSettings,
		ViewSettings
	},
	computed: {
		glyphsets: {
			get() {
				return this.$store.getters['glyphs/getActiveCharacterSets'];
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
	&__settings {
		padding: 1em;
		display: flex;
		background-color: rgba(0, 0, 0, 0.25);
	}
}
.glyphs {
	&__title {
		padding: 2em;
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
		--size: 10em;
		width: var(--size);
		height: var(--size);
		padding: calc(var(--size) / 20);
		canvas {
			border: 1px solid rgba(0, 0, 0, 0.25);
			background-color: white;
		}
	}
}
</style>
