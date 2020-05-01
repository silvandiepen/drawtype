<template>
	<main class="page-draw">
		<div class="heading">
			Glyphs
		</div>
		<ul class="glyphs__list">
			<li v-for="(glyph, idx) in glyphs" :key="idx" class="glyphs__item">
				<GlyphCanvas v-model="glyph.data" :glyph="glyph.char" />
			</li>
		</ul>
	</main>
</template>
<script>
import GlyphCanvas from '@/components/glyphCanvas.vue';
export default {
	components: {
		GlyphCanvas
	},
	data: () => ({
		glyphs: [
			{ char: 'a', data: null },
			{ char: 'b', data: null },
			{ char: 'c', data: null },
			{ char: 'd', data: null },
			{ char: 'e', data: null },
			{ char: 'f', data: null },
			{ char: 'g', data: null },
			{ char: 'h', data: null },
			{ char: 'i', data: null },
			{ char: 'j', data: null }
		]
	})
};
</script>
<style lang="scss">
.heading {
	padding: 4vw;
}
.glyphs {
	&__list {
		display: flex;
		flex-wrap: wrap;
		border: 1px solid red;
		background-color: rgba(255, 250, 245);
	}
	&__item {
		width: 33.33%;
		height: 33.33vw;
		gap: 10em;
		padding: 1em;
		canvas {
			border: 1px solid rgba(0, 0, 0, 0.25);
			background-color: white;
		}
	}
}
</style>
