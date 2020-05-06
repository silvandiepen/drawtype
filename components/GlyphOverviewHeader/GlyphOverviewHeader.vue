<template>
	<div class="heading">
		<div></div>
		<div><input v-model="fontTitle" class="font-title" type="text" /></div>
		<SettingsPanel class="heading__settings" />
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { SettingsPanel } from '@/components';

export default Vue.extend({
	components: {
		SettingsPanel
	},
	computed: {
		fontTitle: {
			get(): string {
				return this.$store.getters['glyphs/getTitle'];
			},
			set(value: string): void {
				this.$store.dispatch('glyphs/setTitle', value);
			}
		}
	}
});
</script>
