<template>
	<main class="glyphs__overview">
		<div
			v-for="(glyphset, idg) in glyphsets"
			:key="idg"
			class="glyphs__set"
			:style="`--view-size:${viewSize}em; --view-opacity:${viewOpacity / 100};`"
		>
			<h3 class="glyphs__title">{{ glyphset.title }}</h3>
			<ul class="glyphs__list">
				<li
					v-for="(glyph, idx) in glyphset.data"
					:key="idx"
					class="glyphs__item"
				>
					<GlyphCanvas v-model="glyph.data" :glyph="glyph" />
				</li>
			</ul>
		</div>
	</main>
</template>

<script>
import GlyphCanvas from '@/components/GlyphCanvas/GlyphCanvas.vue';

export default {
	components: {
		GlyphCanvas
	},
	computed: {
		fontTitle: {
			get() {
				return this.$store.getters['glyphs/getTitle'];
			},
			set(value) {
				this.$store.dispatch('glyphs/setTitle', value);
			}
		},
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
	},
	mounted() {
		// get the sticky element
		const stickyElm = document.querySelectorAll('.glyphs__set');

		stickyElm.forEach((elm) => {
			const observer = new IntersectionObserver(
				([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
				{ threshold: [1] }
			);
			observer.observe(elm);
		});
	}
};
</script>
<style lang="scss">
.glyphs {
	&__overview {
	}
	&__title {
		position: sticky;
		top: 0;
		z-index: 2;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		background-color: white;
		padding: 1em 2em;
	}
	&__list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		background-color: rgba(240, 250, 255);
		overflow: hidden;
		margin: 0 !important;
		padding: 2em !important;
	}
	&__item {
		width: var(--view-size, 10em);
		height: var(--view-size, 10em);
		padding: calc(var(--view-size, 10em) / 20);
		canvas {
			border: 1px solid rgba(0, 0, 0, 0.25);
			background-color: white;
		}
	}
}
</style>
