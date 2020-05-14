<template>
	<div class="heading row">
		<div class="heading__column--spacer"></div>
		<div class="heading__column--title">
			<input
				v-model="fontTitle"
				placeholder="Your font title"
				class="font-title"
				type="text"
			/>
		</div>
		<div class="heading__column--settings">
			<SettingsPanel />
		</div>
		<BrushSettings class="heading__column--brush" />
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { SettingsPanel, BrushSettings } from '@/components';

export default Vue.extend({
	components: {
		SettingsPanel,
		BrushSettings
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

	.dark & {
		background-color: $color-dark;
		color: white;
	}

	&__column {
		outline: 1px solid red;
		&--spacer {
			display: none;
			@media #{$large-up} {
				display: block;
				width: 33.33%;
			}
		}
		&--settings {
			// @media #{$medium-down} {
			position: fixed;
			bottom: 1em;
			left: 50%;
			border-radius: $base-border-radius-l;
			background-color: $color-light;

			transform: translateX(-50%);
			// }
		}
		&--brush {
			position: fixed;
			top: 50%;
			right: 1em;
			border-radius: $base-border-radius-l;
			background-color: white;
			transform: translateY(-50%);
			padding: 1em;
			@media #{$small-only} {
				right: 0;
				border-radius: $base-border-radius-l 0 0 $base-border-radius-l;
			}
		}
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
	.dark & {
		background-color: $color-dark;
		color: white;
	}
}
</style>
