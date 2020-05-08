<template>
	<div class="settings">
		<BrushSettings class="settings__brush" />
		<ViewSettings class="settings__view" />
		<button class="settings__trigger" @click="triggerSettings">
			Settings
		</button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Brush from './Brush.vue';
import View from './View.vue';

export default Vue.extend({
	components: {
		BrushSettings: Brush,
		ViewSettings: View
	},
	methods: {
		triggerSettings() {
			this.$store.dispatch('ui/setActiveSettings', true);
		}
	}
});
</script>

<style lang="scss">
.settings {
	top: 0;
	left: 0;
	display: flex;
	justify-content: flex-end;
	margin: 0;
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
		border: none;
		background-color: transparent;
		font-weight: bold;
		font-size: 0.75em;
		padding: 0 1em;
		// border: 1px solid red;
	}
}
</style>
