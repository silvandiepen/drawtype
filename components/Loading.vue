<template>
	<div class="loading-screen" :class="{ 'loading-screen--active': isLoading }">
		<div class="loading-screen__background"></div>
		<div class="loading-screen__loader-holder">
			<div class="loading-screen__loader"><span></span></div>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	computed: {
		isLoading() {
			return this.$store.state.ui.loading;
		}
	}
});
</script>

<style lang="scss">
@import '~tools';
.loading-screen {
	position: fixed;
	top: 50%;
	left: 50%;
	z-index: 5;
	width: 120vw;
	height: 120vh;
	transform: translate(-50%, -50%);
	pointer-events: none;
	&__background {
		position: absolute;
		top: 0;
		left: 0;
		width: 0%;
		height: 0%;
		background-color: rgba($color-secondary, 1);
		opacity: 0;
		transition: opacity $base-transition ease-in-out;
	}
	&__loader {
		border-radius: 50%;
		animation: rotator 2s infinite ease-in-out;

		&,
		&-holder,
		span {
			position: absolute;
			top: 50%;
			left: 50%;
			display: block;
			width: 8em;
			height: 8em;
		}
		&,
		span {
			border: 1em solid white;
			border-top-color: transparent;
			border-right-color: $color-primary;
			border-bottom-color: mix($color-primary, white);
			border-radius: 50%;
			transform: translate(-50%, -50%) rotate(0deg);
		}
		span {
			opacity: 0.5;
			animation: rotator 2s 0.5s infinite ease-in-out;
		}
		&-holder {
			transform: translate(-50%, -50%) rotate(0deg) scale(0);
			transition: transform $base-transition $base-cubic-bezier;
		}
		@at-root {
			@keyframes rotator {
				to {
					transform: translate(-50%, -50%) rotate(360deg);
				}
			}
		}
	}

	&--active {
		.loading-screen__background {
			width: 100%;
			height: 100%;
			opacity: 1;
		}
		.loading-screen__loader-holder {
			transform: translate(-50%, -50%) rotate(0deg) scale(1);
		}
	}
}
</style>
