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
			<g>
				<path
					d="M56,171h-4c-2.209,0-4-1.791-4-4v-23h12v23C60,169.209,58.209,171,56,171z"
				/>
			</g>
			<g>
				<path
					d="M56,129h-4c-2.209,0-4-1.791-4-4V40c0-2.209,1.791-4,4-4h4c2.209,0,4,1.791,4,4v85C60,127.209,58.209,129,56,129z"
				/>
			</g>
			<g>
				<path
					d="M164,171h-4c-2.209,0-4-1.791-4-4v-23h12v23C168,169.209,166.209,171,164,171z"
				/>
			</g>
			<g>
				<path
					d="M164,129h-4c-2.209,0-4-1.791-4-4V40c0-2.209,1.791-4,4-4h4c2.209,0,4,1.791,4,4v85C168,127.209,166.209,129,164,129z"
				/>
			</g>
			<g>
				<path
					d="M110,171h-4c-2.209,0-4-1.791-4-4V90h12v77C114,169.209,112.209,171,110,171z"
				/>
			</g>
			<g>
				<path
					d="M110,75h-4c-2.209,0-4-1.791-4-4V40c0-2.209,1.791-4,4-4h4c2.209,0,4,1.791,4,4v31C114,73.209,112.209,75,110,75z"
				/>
			</g>
			<g>
				<path
					d="M68,135H40c-2.209,0-4-1.791-4-4v-4c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v4C72,133.209,70.209,135,68,135z"
				/>
			</g>
			<g>
				<path
					d="M176,135h-28c-2.209,0-4-1.791-4-4v-4c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v4C180,133.209,178.209,135,176,135z"
				/>
			</g>
			<g>
				<path
					d="M122,81H94c-2.209,0-4-1.791-4-4v-4c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v4C126,79.209,124.209,81,122,81z"
				/>
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
