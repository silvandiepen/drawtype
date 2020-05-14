<template>
	<span class="icon icon--moon" :style="computedStyle">
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
				d="M110,177h-0.953c-37.865,0-69.462-30.068-70.039-67.929C38.421,70.536,69.597,39,108,39h2c2.209,0,4,1.791,4,4v130
	C114,175.209,112.209,177,110,177z M102,51.313C73.379,54.321,51,78.596,51,108s22.379,53.679,51,56.687V51.313z"
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
	name: 'IconMoon',
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
.icon--moon {
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
