<template>
	<div
		ref="glyphCanvasContainer"
		class="glyph-canvas"
		:class="{
			'glyph-canvas--active': isActive,
			'glyph-canvas--dirty': glyph.data
		}"
		@click="setActive"
	>
		<div class="glyph-canvas__shadow"></div>
		<div class="glyph-canvas__container">
			<canvas
				:id="`canvas-${glyph.unicode}`"
				ref="glyphCanvas"
				class="glyph-canvas__canvas"
			></canvas>
			<div class="glyph-canvas__glyph">{{ glyph.glyph }}</div>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { fabric } from 'fabric';
import { ICanvasOptions, StaticCanvas } from 'fabric/fabric-impl';
import { PSBrush, PSBrushIface } from '@arch-inc/fabricjs-psbrush/dist';
import { BrushStateType, GlyphDataType } from '@/types';

interface extendedICanvasOptions extends ICanvasOptions, StaticCanvas {
	freeDrawingBrush: any;
	setHeight: any;
	setWidth: any;
	renderAll: any;
}
export default Vue.extend({
	props: {
		code: {
			type: Number,
			default: 0
		},
		set: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		brush: {} as PSBrushIface,
		canvas: {} as extendedICanvasOptions,
		canvasContainer: null as HTMLCanvasElement | null
	}),
	computed: {
		glyph: {
			get(): GlyphDataType {
				return this.$store.getters['glyphs/getGlyph']({
					set: this.$props.set,
					unicode: this.$props.code
				});
			}
		},
		brushSettings(): BrushStateType {
			return this.$store.getters['brush/getBrush'];
		},
		viewSize(): number {
			return this.$store.state.view.size;
		},
		isActive: {
			get(): boolean {
				if (this.glyph && this.glyph.unicode)
					return this.$store.state.ui.currentActiveGlyph === this.glyph.unicode;
				else return false;
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
			this.setGlyphData();
			// this.glyph.data = this.canvas.toSVG();
		});
	},
	methods: {
		setActive() {
			this.$store.dispatch('ui/setActiveGlyph', this.glyph.unicode);
		},
		setGlyphData() {
			this.$store.dispatch('glyphs/setGlyphData', {
				set: this.$props.set,
				unicode: this.glyph.unicode,
				data: this.canvas.toSVG()
			});
		},
		setCanvasSize() {
			if (this.canvas) {
				let size = 240;
				if (window.innerWidth < 640) size = 320;
				this.canvas.setHeight(size);
				this.canvas.setWidth(size);
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
			if (this.glyph) {
				this.canvasContainer = document.querySelector(
					'#canvas-' + this.glyph.unicode
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
				this.brush.color = this.brushSettings.color;
				this.brush.opacity = this.brushSettings.opacity / 100;
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
@import '~tools';

.glyph-canvas {
	position: relative;
	height: 100%;
	.dark & {
		color: white;
	}
	canvas {
		pointer-events: none;
	}
	&__container {
		position: relative;
		z-index: 1;
		border-radius: $base-border-radius-l;
		background-color: white;
		.dark & {
			background-color: $color-dark;
		}
	}

	&__shadow {
		z-index: -1;
	}
	&--active {
		canvas {
			pointer-events: all;
		}
		.glyph-canvas__shadow {
			@include shadow();
		}
	}
	&,
	canvas,
	&__glyph {
		width: 240px;
		height: 240px;
		border-radius: $base-border-radius-l;
		line-height: 240px;
		@media #{$small-only} {
			width: 320px;
			height: 320px;
			line-height: 320px;
		}
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
