<template>
	<div class="heading row">
		<div class="small-half medium-third"></div>
		<div class="small-half medium-third">
			<input
				v-model="fontTitle"
				placeholder="Your font title"
				class="font-title"
				type="text"
			/>
		</div>
		<SettingsPanel class="hide-for-small-only medium-third heading__settings" />
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
				return this.$store.getters['glyphs/getSettings'].title;
			},
			set(value: string): void {
				this.$store.dispatch('glyphs/setTitle', value);
			}
		}
	}
});
</script>

<style lang="scss">
@import '~tools';

.hide-for-small-only {
	@media #{$small-only} {
		display: none;
	}
}
.heading {
	position: sticky;
	top: 0;
	z-index: 5;
	display: flex;
	justify-content: space-between;
	padding: 1em;
	> div {
		width: 33.33%;
	}
}
.font-title {
	width: 100%;
	border: none;
	outline: 1px solid transparent;
	text-align: center;
	padding: 0.5em;
	@include heading-h3();
	&:focus {
		outline: 1px solid currentColor;
	}
	@media #{$small-only} {
		text-align: right;
	}
}
</style>
