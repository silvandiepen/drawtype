<template>
	<div class="glyphs__set">
		<div class="glyphs__heading">
			<h3 class="glyphs__title">{{ glyphSet.title }}</h3>
			<span class="glyphs__done">
				{{ haveData }}/ {{ glyphSet.data.length }}</span
			>
			<ul class="glyphs__example">
				<li
					v-for="(glyph, idx) in glyphSet.data"
					:key="idx"
					class="glyphs__example-glyph"
					v-html="glyph.data"
				></li>
			</ul>
		</div>

		<ul class="glyphs__list">
			<li v-for="(glyph, idx) in glyphSet.data" :key="idx" class="glyphs__item">
				<GlyphCanvas :code="glyph.unicode" :set="glyphSet.id" />
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GlyphCanvas } from '@/components';
import { GlyphSetType, GlyphDataType } from '@/types';

export default Vue.extend({
	components: {
		GlyphCanvas
	},
	props: {
		set: {
			type: String,
			default: ''
		}
	},
	computed: {
		glyphSet(): GlyphSetType | undefined {
			return this.$store.getters['glyphs/getGlyphSet'](this.$props.set);
		},
		haveData(): number {
			if (this.glyphSet && this.glyphSet.data)
				return this.glyphSet.data.filter(
					(set: GlyphDataType) => set.data !== undefined
				).length;
			else return 0;
		}
	}
});
</script>
<style lang="scss">
@import '~tools';
.glyphs {
	&__overview {
	}
	&__heading {
		position: sticky;
		top: 0;
		z-index: 2;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		background-color: white;
		padding: 1em 2em;
		@media #{$small-only} {
			padding: 1em;
		}
	}
	&__example {
		position: sticky;
		top: 0;
		z-index: 1;
		display: flex;
		justify-content: center;
		background-color: white;
		color: black;
		&-glyph {
			svg {
				width: 3em;
				height: 3em;
				line {
					fill: currentColor;
					stroke: currentColor;
				}
			}
		}
	}
	&__list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		overflow: hidden;
		margin: 0 !important;
		padding: 2em !important;
		@include soft();
	}
	&__item {
		// width: var(--view-size, 10em);
		// height: var(--view-size, 10em);
		padding: 1em;
		// canvas {
		// 	border: 1px solid rgba(0, 0, 0, 0.25);
		// 	background-color: white;
		// }
	}
}
</style>
