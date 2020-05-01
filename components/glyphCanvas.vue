<template>
	<div ref="glyphCanvasContainer" class="glyph-canvas">
		<canvas ref="glyphCanvas" class="glyph-canvas__canvas"></canvas>
		<div class="glyph-canvas__glyph">{{ glyph }}</div>
	</div>
</template>
<script>
import { fabric } from 'fabric';
export default {
	props: {
		glyph: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		canvas: null
	}),
	mounted() {
		this.initCanvas();
	},
	methods: {
		initCanvas() {
			const size = this.$refs.glyphCanvasContainer.getBoundingClientRect();
			this.canvas = new fabric.Canvas(this.$refs.glyphCanvas);
			this.canvas.isDrawingMode = true;
			this.canvas.setHeight(size.height);
			this.canvas.setWidth(size.width);
		}
	}
};
</script>
<style lang="scss">
.glyph-canvas {
	position: relative;
	width: 100%;
	height: 100%;
	&__glyph {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		font-size: 25vw;
		line-height: 20vw;
		text-align: center;
		opacity: 0.15;
		pointer-events: none;
	}
}
</style>
