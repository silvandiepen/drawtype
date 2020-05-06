<template>
	<div class="settings settings--view">
		<div class="settings__fields">
			<div class="input-field">
				<input
					v-model="glyphSize"
					type="range"
					min="5"
					max="50"
					class="input-field__input--range input--range"
				/>
				<label>size</label>
				<!-- <span class="input-field__value">{{ glyphSize }}</span> -->
			</div>
			<div class="input-field">
				<input
					v-model="glyphOpacity"
					type="range"
					min="0"
					max="100"
					class="input-field__input--range input--range"
				/>
				<label>opacity</label>
				<!-- <span class="input-field__value">{{ glyphOpacity }}</span> -->
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { debounce } from 'lodash';
export default Vue.extend({
	computed: {
		glyphSize: {
			get(): number {
				return this.$store.getters['view/getSize'];
			},
			set(value: number): void {
				debounce(() => {
					this.$store.dispatch('view/setView', { type: 'size', value });
				}, 500);
			}
		},
		glyphOpacity: {
			get(): number {
				return this.$store.getters['view/getOpacity'];
			},
			set(value: number): void {
				this.$store.dispatch('view/setView', { type: 'opacity', value });
			}
		}
	}
});
</script>

<style lang="scss">
.settings {
	&--view {
		display: flex;
		justify-content: flex-end;
	}
	&__fields {
		display: flex;
		.input-field {
			padding: 0.5em;
			display: flex;
			flex-direction: column;
			label {
				display: block;
				font-weight: bold;
				font-size: 0.75em;
				text-transform: uppercase;
				opacity: 0.25;
				padding: 0.5em 0;
			}
		}
	}
}
</style>
