<template>
	<div class="settings setting--view">
		<h4>View</h4>
		<div>
			<div class="input-field">
				<input v-model="glyphSize" type="range" min="1" max="100" />
				<label>Size</label>
				<span class="input-field__value">{{ glyphSize }}</span>
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
				this.$store.dispatch('view/setSize', value);
			}
		}
	}
});
</script>
