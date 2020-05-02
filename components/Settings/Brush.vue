<template>
	<div class="settings setting--brush">
		<h4>Brush</h4>
		<div>
			<div class="input-field">
				<input v-model="brushSize" type="range" min="1" max="100" />
				<label>Size</label>
				<span class="input-field__value">{{ brushSize }}</span>
			</div>
			<div class="input-field">
				<input v-model="brushOpacity" type="range" min="1" max="100" />
				<label>Size</label>
				<span class="input-field__value">{{ brushOpacity }}</span>
			</div>
			<div class="input-field">
				<input v-model="brushSmoothness" type="range" min="1" max="100" />
				<label>Smoothness</label>
				<span class="input-field__value">{{ brushSmoothness }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	computed: {
		brushSize: {
			set(value: number) {
				this.$store.dispatch('brush/setBrush', { type: 'size', value });
			},
			get(): number {
				return this.$store.getters['brush/getSize'];
			}
		},
		brushOpacity: {
			set(value: number) {
				this.$store.dispatch('brush/setBrush', { type: 'opacity', value });
			},
			get(): number {
				return this.$store.getters['brush/getSize'];
			}
		},
		brushSmoothness: {
			set(value: number) {
				this.$store.dispatch('brush/setBrush', { type: 'smoothness', value });
			},
			get(): number {
				return this.$store.getters['brush/getSize'];
			}
		}
	}
});
</script>
