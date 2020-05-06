<template>
	<div class="settings">
		<BrushSettings class="settings__brush" />
		<ViewSettings class="settings__view" />
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
	}
});
</script>

<style lang="scss">
.settings {
	// z-index: 10;
	// border: 1px solid red;
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
}
.input-field {
	position: relative;
	display: flex;
	flex-direction: row-reverse;

	&__value {
		// position: absolute;
		// right: 0;
	}
	&__input--range {
		margin: 0;
	}
	&__input--color {
		width: 2em;
		height: 2em;
		border-radius: 50%;
		-webkit-appearance: none;
	}
}
</style>
