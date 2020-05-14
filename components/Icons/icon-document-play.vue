<template>
	<span class="icon icon--document-play" :style="computedStyle">
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
				d="M48,34v148c0,2.209,1.791,4,4,4h112c2.209,0,4-1.791,4-4V71.172c0-1.061-0.421-2.078-1.172-2.828l-37.172-37.172
	c-0.75-0.75-1.768-1.172-2.828-1.172H52C49.791,30,48,31.791,48,34z M132,50.485L147.515,66H132V50.485z M156,174H60V42h60v32
	c0,2.209,1.791,4,4,4h32V174z"
			/>
			<path
				d="M90,102.893v34.215c0,3.071,3.318,4.997,5.985,3.473l29.938-17.107c2.687-1.536,2.687-5.41,0-6.946L95.985,99.42
	C93.318,97.896,90,99.821,90,102.893z"
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
	name: 'IconDocumentPlay',
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
.icon--document-play {
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
