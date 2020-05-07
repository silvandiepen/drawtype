<template>
	<div class="glyphs__set">
		<div class="glyphs__heading">
			<h3 class="glyphs__title">{{ glyphSet.title }}</h3>
			<div class="glyphs__status">
				<span
					class="glyphs__progress"
					:class="{
						'glyphs__progress--done': haveData == glyphSet.data.length
					}"
				>
					<span class="glyphs__done">{{ haveData }}</span>
					<span class="glyphs__total">{{ glyphSet.data.length }}</span>
				</span>
			</div>
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
	&,
	&__set {
		color: currentColor;
		.dark & {
			color: white;
		}
	}
	&__overview {
	}
	&__heading {
		position: sticky;
		top: 0;
		z-index: 2;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		background-color: white;
		padding: 1em 2em;
		color: currentColor;
		@media #{$small-only} {
			padding: 1em;
		}
		.dark & {
			background-color: $color-dark;
		}
	}
	&__progress {
		border: 1px solid currentColor;
		border-radius: $base-border-radius;
		color: currentColor;
		font-size: 0.8em;
		line-height: 1;
		opacity: 0.35;
		padding: 0.25em 0.5em;
		span + span {
			&:before {
				content: ' / ';
			}
		}
		&--done {
			border-color: currentColor;
			color: color(Green);
			&::before {
				content: 'Done';
			}
			span {
				display: none;
			}
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
		.dark & {
			background-color: $color-dark;
		}
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
