<template>
	<div
		ref="glyphCanvasContainer"
		class="glyph-canvas"
		:class="{
			'glyph-canvas--active': isActive,
			'glyph-canvas--dirty': glyph.data,
			'glyph-canvas--not-loaded': !isInitialized
		}"
		@click="setActive"
	>
		<div class="glyph-canvas__shadow"></div>
		<div class="glyph-canvas__container">
			<div class="glyph-canvas__tools">
				<button @click="cleanCanvas">clean</button>
			</div>
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
		canvasContainer: null as HTMLCanvasElement | null,
		isInitialized: false
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
		currentBrush(): any {
			return this.$store.getters['brush/getCurrentBrush'];
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
				if (this.isActive) this.setBrush();
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
					if (this.isInitialized) this.canvas.isDrawingMode = true;
					else this.initCanvas();
				} else {
					this.canvas.isDrawingMode = false;
				}
			}
		}
	},
	mounted() {
		if (this.isActive) {
			this.initCanvas();
		}
	},
	methods: {
		cleanCanvas() {
			this.canvas.clear();
			this.setGlyphData();
		},
		setActive() {
			this.$store.dispatch('ui/setActiveGlyph', this.glyph.unicode);
			this.initDoubleTap();
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

		initDoubleTap() {
			if (this.canvasContainer)
				this.canvasContainer.addEventListener('touchstart', (e) => {
					console.log(e.touches);
				});
		},
		initCanvas() {
			if (this.glyph) {
				this.canvasContainer = document.querySelector(
					'#canvas-' + this.glyph.unicode
				);
				if (this.canvasContainer) {
					this.canvas = new fabric.Canvas(this.canvasContainer, {});
					this.canvas.isDrawingMode = true;
					this.setCanvasSize();
					this.setBrush();
				}
			}
			this.canvas.on('object:added', () => {
				this.setGlyphData();
			});
			this.isInitialized = true;
		},
		setBrush() {
			switch (this.brushSettings.type) {
				case 'brush':
					if (this.canvas) this.brush = new PSBrush(this.canvas);
					if (this.brush) {
						this.brush.width = this.brushSettings.size;
						this.brush.color = this.brushSettings.color;
						this.brush.opacity = this.brushSettings.opacity / 100;
						this.canvas.freeDrawingBrush = this.brush;
					}
					break;
				case 'eraser':
					this.canvas.freeDrawingBrush.color = 'red';
					this.canvas.freeDrawingBrush.width = this.brushSettings.size;
					this.canvas.freeDrawingBrush.globalCompositionOperation =
						'destination-out';
					this.canvas.freeDrawingBrush.id = 'erasure';
					break;
			}
		}
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
	&--not-loaded {
		canvas {
			display: none;
		}
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
		.glyph-canvas__tools {
			display: block;
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
	&__tools {
		position: absolute;
		top: 100%;
		left: 0;
		display: flex;
		display: none;
		height: auto;
		color: white;
		line-height: 1;
		padding: 0.25em 0.5em;
		button {
			border: none;
			border-radius: $base-border-radius;
			background-color: transparent;
			background-color: $color-dark;
			color: currentColor;
			padding: 0.5em;
			&:focus {
				outline: none;
			}
		}
	}
}
</style>
