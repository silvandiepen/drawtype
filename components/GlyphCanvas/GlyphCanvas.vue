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
		canvas: null,
		canvasContainer: null
	}),
	computed: {
		brushSettings() {
			return this.$store.getters['brush/getBrush'];
		},
		charCode() {
			return this.$props.glyph.charCodeAt(0);
		},
		viewSize() {
			return this.$store.state.view.size;
		}
	},
	watch: {
		brushSettings: {
			handler() {
				this.setBrushSettings();
			},
			deep: true,
			immediate: true
		},
		viewSize: {
			handler() {
				this.setCanvasSize();
			}
		}
	},
	mounted() {
		// setTimeout(() => {
		this.initCanvas();
		// }, 500);
	},
	methods: {
		setCanvasSize() {
			this.canvas.setHeight(this.viewSize * 14.5);
			this.canvas.setWidth(this.viewSize * 14.5);
			this.canvas.renderAll();
		},
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
			this.canvasContainer = document.querySelector('#canvas-' + this.charCode);

			this.canvas = new fabric.Canvas(this.canvasContainer, {
				isDrawingMode: true,
				enablePointerEvents: true
			});
			this.setCanvasSize();
			this.setBrush();
		},
		setBrush() {
			this.brush = new PSBrush(this.canvas, {});
			this.brush.width = this.brushSettings.size;
			this.brush.color = '#000000';
			this.brush.opacity = 0.5;
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
	height: 100%;
	&__glyph {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		font-size: calc(var(--glyph-size) / 2);
		// line-height: 1.75;
		line-height: calc((var(--glyph-size) / 5) * 1em);
		text-align: center;
		opacity: 0.15;
		pointer-events: none;
	}
}
</style>
