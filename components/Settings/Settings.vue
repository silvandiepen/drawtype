<template>
	<div class="settings">
		<BrushSettings class="settings__brush" />
		<!-- <ViewSettings class="settings__view" /> -->
		<div class="settings__tools">
			<button
				class="settings__trigger ui-button"
				:class="[
					brushType === 'brush' ? 'ui-button--active' : 'ui-button--inactive'
				]"
				@click="brushType = 'brush'"
			>
				<span class="ui-button__background" />
				<IconBrush class="ui-button__icon" />
			</button>
			<button
				class="settings__trigger ui-button"
				:class="[
					brushType === 'eraser' ? 'ui-button--active' : 'ui-button--inactive'
				]"
				@click="brushType = 'eraser'"
			>
				<span class="ui-button__background" />
				<IconEraser class="ui-button__icon" />
			</button>
			<span class="ui-separator"></span>
			<button class="settings__trigger ui-button" @click="triggerSettings">
				<IconSettings class="ui-button__icon" />
				<!-- <span class="ui-button__text">Settings</span> -->
			</button>
			<button class="settings__trigger ui-button">
				<IconExport class="ui-button__icon" />
				<!-- <span class="ui-button__text">Export</span> -->
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Brush from './Brush.vue';
import { BrushTypes } from '@/types';
// import View from './View.vue';
import {
	IconSettings,
	IconExport,
	IconBrush,
	IconEraser
} from '@/components/Icons';

export default Vue.extend({
	components: {
		BrushSettings: Brush,
		IconSettings,
		IconExport,
		IconBrush,
		IconEraser
		// ViewSettings: View
	},
	computed: {
		brushType: {
			set(value: BrushTypes): void {
				this.$store.dispatch('brush/setBrush', { type: 'type', value });
			},
			get(): string {
				return this.$store.getters['brush/getType'];
			}
		}
	},
	methods: {
		triggerSettings() {
			this.$store.dispatch('ui/setActiveSettings', true);
		}
	}
});
</script>

<style lang="scss">
@import '~tools';
.ui-separator {
	display: inline-block;
	width: 2px;
	height: 32px;
	background-color: currentColor;
	opacity: 0.125;
	margin: 1em;
}
.ui-button {
	position: relative;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	min-width: 3em;
	height: 3em;
	border: none;
	border-radius: $base-border-radius;
	background-color: transparent;
	line-height: 3em;
	padding: 0;
	&--inactive {
		opacity: 0.5;
	}
	&--active {
		.ui-button__background {
			transform: scale(1);
			opacity: 1;
		}
	}
	&:focus {
		outline: none;
	}
	&__text {
		position: relative;
		z-index: 2;
		display: block;
		height: 3em;
		line-height: 3em;
	}
	&__icon {
		position: relative;
		z-index: 2;
		display: block;
		height: 2em;
	}
	&__background {
		position: absolute;
		z-index: 0;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		background-color: rgba($color-secondary, 0.25);
		transform: scale(0.5);
		opacity: 0;
		transition: all 0.3s ease-in-out;
	}
}
.settings {
	top: 0;
	left: 0;
	display: flex;
	justify-content: flex-end;
	margin: 0;
	&__tools {
		display: flex;
		justify-content: flex-end;
		padding: 1em;
		align-items: center;
	}
	&__brush {
		position: fixed;
		top: 50%;
		right: 1em;
		z-index: 5;
		display: flex;
		flex-direction: column;
		border-radius: 0.5em;
		transform: translateY(-50%);
	}
	&__view {
		// border: 1px solid red;
	}
	&__trigger {
		// border: none;
		// background-color: transparent;
		// font-weight: bold;
		// font-size: 0.75em;
		// padding: 0 1em;
		// // border: 1px solid red;
	}
}
</style>
