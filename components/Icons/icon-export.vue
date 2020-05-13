<template>
	<span class="icon icon--export" :style="computedStyle">
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
			<g>
				<g>
					<path
						d="M163,121v25c0,4.418-3.582,8-8,8H64c-4.418,0-8-3.582-8-8v-25c0-2.209-1.791-4-4-4h-8c-2.209,0-4,1.791-4,4v25
			c0,13.255,10.745,24,24,24h91c13.255,0,24-10.745,24-24v-25c0-2.209-1.791-4-4-4h-8C164.791,117,163,118.791,163,121z"
					/>
				</g>
				<g>
					<path
						d="M88.243,63H100v68c0,2.209,1.791,4,4,4h8c2.209,0,4-1.791,4-4V63h11.757c2.673,0,4.011-3.231,2.121-5.121l-19.757-19.757
			c-1.172-1.172-3.071-1.172-4.243,0L86.121,57.879C84.231,59.769,85.57,63,88.243,63z"
					/>
				</g>
			</g>
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
	name: 'IconExport',
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
.icon--export {
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
