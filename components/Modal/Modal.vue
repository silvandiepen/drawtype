<template>
	<div
		class="modal"
		:class="{
			'modal--active': active,
			'modal--background': active && showBackground
		}"
	>
		<div
			v-if="showBackground"
			class="modal__background"
			@click="active = false"
		/>
		<div class="modal__container">
			<div class="spacer"></div>
			<div class="modal__modal">
				<div class="modal__shadow"></div>
				<div class="modal__panel">
					<slot></slot>
				</div>
			</div>
			<slot name="button"></slot>
			<div class="spacer spacer--quarter"></div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	props: {
		active: {
			type: Boolean,
			default: false
		},
		showBackground: {
			type: Boolean,
			default: true
		}
	}
});
</script>

<style lang="scss">
@import '~tools';
.modal {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 10;
	display: flex;
	flex-direction: column;
	align-items: center;

	height: 100vh;
	max-height: -webkit-fill-available;
	transform: scale(0);
	overflow: scroll;
	opacity: 0;
	transition: transform 0.25s 0.25s ease-in-out, opacity 0.25s ease-in-out;
	pointer-events: none;

	&--active {
		transform: scale(1);
		opacity: 1;
		transition: transform 0s ease-in-out, opacity 0.25s ease-in-out;
		pointer-events: all;
		.modal__background {
			opacity: 1;
			transition: opacity 0.5s 0.5s;
		}
	}
	&--background {
		background-color: rgba(0, 0, 0, 0.85);
	}

	&__background {
		// 	position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: red;
		// 	left: 50%;
		// 	width: 100vw;
		// 	height: 100%;
		// 	background-color: rgba(0, 0, 0, 0.25);
		// 	transform: translateX(-50%);
		// 	opacity: 0;
		// 	transition: opacity 1s 1s;
	}
	&__container {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		width: 640px;
		max-width: 90vw;
		pointer-events: all;
	}
	&__modal {
		position: relative;
	}
	&__panel {
		position: relative;
		z-index: 2;
		box-shadow: 0 0.25em 0 0 color(PinkLight);
		border-radius: $base-border-radius-xl;
		background-color: white;
		.dark & {
			box-shadow: 0 0.25em 0 0 color(PinkDark);
			background-color: $color-dark;
			color: white;
		}
		> *:last-child {
			border-radius: 0 0 $base-border-radius-xl $base-border-radius-xl;
		}
	}
	&__shadow {
		position: absolute;
		@include shadow();
	}
}
</style>
