<template>
	<div ref="glyphCanvasContainer" class="glyph-canvas">
		<canvas
			:id="`canvas-${charCode}`"
			ref="glyphCanvas"
			class="glyph-canvas__canvas"
		></canvas>
		<div class="glyph-canvas__glyph">{{ glyph }}</div>
	</div>
</template>
<script>
import Vue from 'vue';
import { fabric } from 'fabric';
import { PSBrush, PSStroke } from '@arch-inc/fabricjs-psbrush/dist';
// import { ICanvasOptions } from 'fabric/fabric-impl';
// import { BrushStateType } from '@/store/brush/types';
// interface GlyphCanvasDataType {
// 	brush: any;
// 	canvas: any;
// }
// interface extraOptions extends ICanvasOptions {
// 	width: number;
// 	enablePointerEvents: boolean;
// }
export default Vue.extend({
	props: {
		glyph: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		brush: null,
		canvas: null
	}),
	computed: {
		brushSettings() {
			return this.$store.getters['brush/getBrush'];
		},
		charCode() {
			return this.$props.glyph.charCodeAt(0);
		}
	},
	watch: {
		brushSettings: {
			handler() {
				this.setBrushSettings();
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		// setTimeout(() => {
		this.initCanvas();
		// }, 500);
	},
	methods: {
		setBrushSettings() {
			// console.log(this.brush);
			if (
				this.canvas &&
				this.canvas.freeDrawingBrush &&
				this.canvas.freeDrawingBrush.color
			) {
				this.canvas.freeDrawingBrush.color = this.brushSettings.color;
				this.canvas.freeDrawingBrush.opacity =
					parseInt(this.brushSettings.opacity) / 100;
				this.canvas.freeDrawingBrush.width = this.brushSettings.size;
				// this.canvas.freeDrawingBrush = this.brush;
			}
		},
		initCanvas() {
			const element = document.querySelector('#canvas-' + this.charCode);
			const size = element.getBoundingClientRect();

			this.canvas = new fabric.Canvas(element, {
				isDrawingMode: true,
				enablePointerEvents: true,
				height: size.height,
				width: size.height
			});
			this.setBrush();
		},
		setBrush() {
			this.brush = new PSBrush(this.canvas, {});
			this.brush.width = this.brushSettings.size;
			this.brush.color = '#000000';
			this.canvas.freeDrawingBrush = this.brush;
		},
		setStroke() {
			this.brush = new PSStroke(this.canvas, {});
			this.brush.width = this.brushSettings.size;
			this.brush.color = '#000000';
			this.canvas.freeDrawingBrush = this.brush;
		}
	}
});
</script>
<style lang="scss">
.glyph-canvas {
	position: relative;

	&__glyph {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		font-size: calc(var(--size) / 2);
		line-height: 1.75;
		// line-height: var(--size);
		text-align: center;
		opacity: 0.15;
		pointer-events: none;
	}
}
</style>
