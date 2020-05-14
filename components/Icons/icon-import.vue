<template>
	<span class="icon icon--import" :style="computedStyle">
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			width="216px"
			height="216px"
			viewBox="0 0 216 216"
			enable-background="new 0 0 216 216"
			xml:space="preserve"
		>
			<path
				d="M130.828,111H114V49c0-2.209-1.791-4-4-4h-4c-2.209,0-4,1.791-4,4v62H85.172c-3.564,0-5.348,4.309-2.828,6.828
	l22.828,22.828c1.562,1.562,4.095,1.562,5.657,0l22.828-22.828C136.177,115.309,134.392,111,130.828,111z"
			/>
			<path
				d="M173,168H43c-2.209,0-4-1.791-4-4v-34c0-2.209,1.791-4,4-4h4c2.209,0,4,1.791,4,4v26h114v-26c0-2.209,1.791-4,4-4h4
	c2.209,0,4,1.791,4,4v34C177,166.209,175.209,168,173,168z"
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
	name: 'IconImport',
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
.icon--import {
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
