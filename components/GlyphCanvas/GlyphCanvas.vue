<template>
	<div
		ref="glyphCanvasContainer"
		class="glyph-canvas"
		:class="{ 'glyph-canvas--active': isActive }"
		@click="setActive"
	>
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
		isActive: {
			get(): boolean {
				return (
					this.$store.state.ui.currentActiveGlyph === this.$props.glyph.unicode
				);
			}
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
		},
		isActive: {
			handler() {
				if (this.isActive) {
					this.canvas.isDrawingMode = true;
				} else {
					this.canvas.isDrawingMode = false;
				}
			}
		}
	},
	mounted() {
		this.initCanvas();

		this.canvas.on('object:added', () => {
			// console.log('haaaiii', e);
		});
		// if (this.canvas) console.log(this.canvas);
		// document.addEventListener('after:render', () => {
		// 	console.log('this one rendered');
		// });
	},
	methods: {
		setActive() {
			this.$store.dispatch('ui/setActiveGlyph', this.$props.glyph.unicode);
		},
		setCanvasSize() {
			if (this.canvas) {
				this.canvas.setHeight(240);
				this.canvas.setWidth(240);
				// this.canvas.setHeight(this.viewSize * 14.5);
				// this.canvas.setWidth(this.viewSize * 14.5);
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
				this.canvas.freeDrawingBrush.opacity = this.brushSettings.opacity / 100;
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
					this.canvas = new fabric.Canvas(this.canvasContainer, {});
					this.setCanvasSize();
					this.setBrush();
				}
			}
		},
		setBrush() {
			if (this.canvas) this.brush = new PSBrush(this.canvas);
			if (this.brush) {
				this.brush.width = this.brushSettings.size;
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
// 	z-index: 10;
// 	mix-blend-mode: multiply;
// 	pointer-events: none;
// }
.glyph-canvas {
	position: relative;
	height: 100%;
	background-color: white;
	canvas {
		pointer-events: none;
	}
	&--active {
		box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.15);
		canvas {
			pointer-events: all;
		}
	}
	&,
	canvas,
	&__glyph {
		width: 240px;
		height: 240px;
		line-height: 240px;
	}
	&__glyph {
		position: absolute;
		top: 0;
		left: 0;
		font-size: calc(var(--view-size) / 2);
		// line-height: 1.75;
		text-align: center;
		opacity: var(--view-opacity);
		pointer-events: none;
	}
}
</style>
