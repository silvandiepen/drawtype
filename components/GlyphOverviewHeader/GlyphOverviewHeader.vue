<template>
	<div class="heading">
		<div></div>
		<div><input v-model="fontTitle" class="font-title" type="text" /></div>
		<SettingsPanel class="heading__settings" />
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	computed: {
		fontTitle: {
			get() {
				return this.$store.getters['glyphs/getTitle'];
			},
			set(value) {
				this.$store.dispatch('glyphs/setTitle', value);
			}
		}
	}
});
</script>
