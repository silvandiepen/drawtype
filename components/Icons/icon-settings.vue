<template>
	<span class="icon icon--settings" :style="computedStyle">
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
			<path d="M72,99H54V40c0-2.209,1.791-4,4-4h10c2.209,0,4,1.791,4,4V99z" />
			<path
				d="M68,171H58c-2.209,0-4-1.791-4-4v-41h18v41C72,169.209,70.209,171,68,171z"
			/>
			<path
				d="M113,171h-10c-2.209,0-4-1.791-4-4V81h18v86C117,169.209,115.209,171,113,171z"
			/>
			<path
				d="M162,126h-18V40c0-2.209,1.791-4,4-4h10c2.209,0,4,1.791,4,4V126z"
			/>
			<path
				d="M77,117H49c-2.209,0-4-1.791-4-4v-10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v10C81,115.209,79.209,117,77,117z"
			/>
			<path
				d="M122,72H94c-2.209,0-4-1.791-4-4V58c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v10C126,70.209,124.209,72,122,72z"
			/>
			<path d="M117,54H99V40c0-2.209,1.791-4,4-4h10c2.209,0,4,1.791,4,4V54z" />
			<path
				d="M167,144h-28c-2.209,0-4-1.791-4-4v-10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v10C171,142.209,169.209,144,167,144z"
			/>
			<path
				d="M158,171h-10c-2.209,0-4-1.791-4-4v-14h18v14C162,169.209,160.209,171,158,171z"
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
	name: 'IconSettings',
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
.icon--settings {
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
