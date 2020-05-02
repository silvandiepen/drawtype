<template>
	<main class="page-draw">
		<div class="heading">
			Draw
			<div class="settings">
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
					<GlyphCanvas :glyph="glyph" />
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
	}
};
</script>
<style lang="scss">
.heading {
	padding: 4vw;
	display: flex;
	justify-content: space-between;
	.settings {
		display: flex;
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
