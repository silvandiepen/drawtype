<template>
	<div ref="glyphCanvasContainer" class="glyph-canvas">
		<canvas
			:id="`canvas-${glyph.unicode}`"
			ref="glyphCanvas"
			class="glyph-canvas__canvas"
		></canvas>
		<div class="glyph-canvas__glyph">{{ glyph.glyph }}</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { fabric } from 'fabric';
import { ICanvasOptions, StaticCanvas } from 'fabric/fabric-impl';
import { PSBrush, PSBrushIface } from '@arch-inc/fabricjs-psbrush/dist';
import { BrushStateType } from '@/types';

interface extendedICanvasOptions extends ICanvasOptions, StaticCanvas {
	freeDrawingBrush: any;
	setHeight: any;
	setWidth: any;
	renderAll: any;
}
export default Vue.extend({
	props: {
		glyph: {
			type: Object,
			default: () => {}
		}
	},
	data: () => ({
		brush: {} as PSBrushIface,
		canvas: {} as extendedICanvasOptions,
		canvasContainer: null as HTMLCanvasElement | null
	}),
	computed: {
		brushSettings(): BrushStateType {
			return this.$store.getters['brush/getBrush'];
		},
		viewSize(): number {
			return this.$store.state.view.size;
		},
		active: {
			get(): boolean {
				return this.$store.getters['glyphs/isActive'](
					this.$props.glyph.unicode
				);
			}
			// set(bool): void {
			// 	this.$store.dispatch('glyphs/setActive', {
			// 		unicode: this.$props,
			// 		active: bool
			// 	});
			// }
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
		this.initCanvas();
	},
	methods: {
		setCanvasSize() {
			if (this.canvas) {
				this.canvas.setHeight(this.viewSize * 14.5);
				this.canvas.setWidth(this.viewSize * 14.5);
				this.canvas.renderAll();
			}
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
			if (this.$props.glyph && this.$props.glyph.unicode) {
				this.canvasContainer = document.querySelector(
					'#canvas-' + this.$props.glyph.unicode
				);
				if (this.canvasContainer) {
					this.canvas = new fabric.Canvas(this.canvasContainer, {
						isDrawingMode: true
					});
					this.setCanvasSize();
					this.setBrush();
				}
			}
		},
		setBrush() {
			if (this.canvas) this.brush = new PSBrush(this.canvas);
			if (this.brush) {
				this.brush.width = parseInt(this.brushSettings.size);
				this.brush.color = '#000000';
				this.brush.opacity = 0.5;
				this.canvas.freeDrawingBrush = this.brush;
			}
		}
		// setStroke() {
		// 	if (this.canvas !== null) {
		// 		this.brush = new PSStroke(this.canvas, {});
		// 		this.brush.width = this.brushSettings.size;
		// 		this.brush.color = '#000000';
		// 		this.canvas.freeDrawingBrush = this.brush;
		// 	}
		// }
	}
});
</script>
<style lang="scss">
.lower-canvas {
	z-index: 10;
	mix-blend-mode: multiply;
	pointer-events: none;
}
.glyph-canvas {
	position: relative;
	height: 100%;
	&__glyph {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		font-size: calc(var(--view-size) / 2);
		// line-height: 1.75;
		line-height: calc((var(--view-size) / 5) * 1em);
		text-align: center;
		opacity: var(--view-opacity);
		pointer-events: none;
	}
}
</style>
