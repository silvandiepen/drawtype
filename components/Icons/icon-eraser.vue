<template>
	<span class="icon icon--eraser" :style="computedStyle">
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			width="225px"
			height="216px"
			viewBox="0 0 225 216"
			enable-background="new 0 0 225 216"
			xml:space="preserve"
		>
			<path
				d="M168.172,105.083l-53.741-53.74c-1.562-1.562-4.095-1.562-5.657,0l-72.125,72.126c-5.459,5.458-5.459,14.34,0,19.798
	L64.382,171h1.167h42.362h52.638c2.209,0,4-1.791,4-4v-4c0-2.209-1.791-4-4-4h-40.638l48.26-48.26
	C169.734,109.178,169.734,106.645,168.172,105.083z M154.029,107.912l-42.427,42.427l-42.426-42.427l42.427-42.426L154.029,107.912z
	 M69.353,159l-24.219-24.218c-0.779-0.78-0.779-2.049,0-2.829l15.557-15.557l42.427,42.427L102.94,159H69.353z"
			/>
		</svg>
	</span>
</template>

<script lang="ts">
import Vue from 'vue';

interface computedStyleProps {
	height: string;
	width: string;
}
export default Vue.extend({
	name: 'IconEraser',
	props: {
		color: {
			type: String,
			default: 'currentColor'
		},
		size: {
			type: Number,
			default: 32
		}
	},
	computed: {
		computedStyle(): computedStyleProps {
			const size = this.$props.size ? this.$props.size : 32;
			return {
				height: size + 'px',
				width: size + 'px'
			};
		}
	}
});
</script>
<style lang="scss">
.icon--eraser {
	display: inline-block;
	overflow: hidden;
	&,
	svg {
		width: calc(var(--size, 32) * 1px);
		height: calc(var(--size, 32) * 1px);
	}
	svg path {
		fill: var(--fill, currentColor);
	}
}
</style>
