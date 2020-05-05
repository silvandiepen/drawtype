<template>
	<div class="settings setting--view">
		<div>
			<div class="input-field">
				<input v-model="glyphSize" type="range" min="5" max="50" />
				<label>viewsize</label>
				<span class="input-field__value">{{ glyphSize }}</span>
			</div>
			<div class="input-field">
				<input v-model="glyphOpacity" type="range" min="0" max="100" />
				<label>example opacity</label>
				<span class="input-field__value">{{ glyphOpacity }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	computed: {
		glyphSize: {
			get(): number {
				return this.$store.getters['view/getSize'];
			},
			set(value: number): void {
				this.$store.dispatch('view/setView', { type: 'size', value });
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
