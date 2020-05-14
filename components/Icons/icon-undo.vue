<template>
	<span class="icon icon--undo" :style="computedStyle">
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
					d="M69,114h78v26c0,2.209,1.791,4,4,4h4c2.209,0,4-1.791,4-4v-34c0-2.209-1.791-4-4-4H69V85.172
		c0-3.564-4.309-5.348-6.828-2.828l-22.828,22.828c-1.562,1.562-1.562,4.095,0,5.657l22.828,22.828
		c2.52,2.52,6.828,0.735,6.828-2.828V114z"
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
	name: 'IconUndo',
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
.icon--undo {
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
