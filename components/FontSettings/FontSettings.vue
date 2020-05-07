<template>
	<div class="font-settings" :class="{ 'font-settings--active': isActive }">
		<div class="font-settings__shadow"></div>
		<div class="font-settings__container">
			<div class="font-settings__content">
				<h2>Settings</h2>
				<p>
					We need some info about the font you want to make. You can change
					anything later aswell, so don't worry.
				</p>
			</div>
			<form v-if="charSets" class="font-settings__form form--stack">
				<h4>Font details</h4>
				<div class="input-field input-field--text">
					<input
						v-model="fontTitle"
						placeholder="My Font Title"
						class="input-field__input input-field__input--text input--text"
						type="text"
					/>
					<label class="input-field__label">Title</label>
				</div>
				<div class="input-field input-field--text">
					<input
						v-model="fontVariation"
						placeholder="ex. Regular, Bold, Condensed, etc.."
						class="input-field__input input-field__input--text input--text"
						type="text"
					/>
					<label class="input-field__label">Variation</label>
				</div>
				<h4>Choose your characters</h4>
			</form>
			<div class="font-settings__sets">
				<ul class="options__list">
					<li
						v-for="(list, idx) in charSets"
						:key="idx"
						class="options__option"
						:class="{ 'options__option--active': list.active }"
						@click="activateCharset(list.name)"
					>
						<h5 class="options__title">{{ list.title }}</h5>
						<ul class="options__set">
							<li
								v-for="(char, idc) in list.data"
								:key="idc"
								class="options__character"
							>
								{{ char.glyph }}
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<button class="button font-settings__save-button" @click="saveSettings">
			Save & Go
		</button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GlyphSetType } from '@/types';
export default Vue.extend({
	computed: {
		isActive: {
			get(): boolean {
				return this.$store.getters['ui/isSettingsActive'];
			},
			set(value: boolean): void {
				this.$store.dispatch('ui/setActiveSettings', value);
			}
		},
		fontTitle: {
			get(): string {
				return this.$store.getters['glyphs/getSettings'].title;
			},
			set(value: string): void {
				this.$store.dispatch('glyphs/setTitle', value);
			}
		},

		fontVariation: {
			get(): string {
				return this.$store.getters['glyphs/getSettings'].variation;
			},
			set(value: string): void {
				this.$store.dispatch('glyphs/setVariation', value);
			}
		},

		charSets(): GlyphSetType[] {
			return this.$store.getters['glyphs/getCharacterSets'];
		}
	},
	methods: {
		activateCharset(name: string) {
			this.$store.dispatch('glyphs/toggleCharset', name);
		},
		saveSettings() {
			this.$store.dispatch('ui/setLoading', true);
			this.$router.push({ path: 'draw' });
			this.isActive = false;
		}
	}
});
</script>
<style lang="scss">
@import '~tools';

.font-settings {
	position: fixed;
	top: 50%;
	left: 50%;
	z-index: 10;
	display: block;
	width: 80%;
	max-width: 640px;
	transform: translate(-50%, -50%) scale(0);

	transition: transform 0.5s ease-in-out;

	&--active {
		transform: translate(-50%, -50%) scale(1);
	}
	&__content {
		padding: grid(1);
	}
	&__form {
		display: block;
		border-radius: $base-border-radius;
		padding: grid(1);
		@include soft();
	}
	&__sets {
		@include soft();
	}
	&__container {
		position: relative;
		z-index: 2;
		max-height: 75vh;
		box-shadow: 0 0.25em 0 0 color(PinkLight);
		border-radius: $base-border-radius-xl;
		background-color: white;

		overflow: scroll;
		> *:last-child {
			border-radius: 0 0 $base-border-radius-xl $base-border-radius-xl;
		}
	}
	&__shadow {
		position: absolute;
		@include shadow();
	}
	&__save-button {
		position: absolute;
		top: calc(100% + 1em);
		left: 50%;
		z-index: 3;
		transform: translateX(-50%);
	}
}
.options {
	padding: 1em;
	width: 100%;

	&__list {
		display: flex;
		max-height: 50vh;
		overflow: scroll;
		padding: 2em !important;
		scroll-snap-type: y mandatory;
		&--active {
			transform: skewY(0deg) translateY(0%);
		}
	}
	&__option {
		display: flex;
		flex-shrink: 0;
		flex-direction: column;
		width: 15em;
		border: 1px solid transparent;
		border-radius: $base-border-radius-l;
		background-color: white;
		opacity: 0.5;
		padding: 1em;
		& + & {
			margin-left: 1em;
		}

		&--active {
			// border-color: rgba(100, 200, 255, 1);

			opacity: 1;
			// background-color: color(Blue);
			animation: bumpy 0.3s ease-in-out forwards;
			.options__set {
				opacity: 0.5;
			}
			.options__title {
				opacity: 1;
			}
			@at-root {
				@keyframes bumpy {
					0%,
					100% {
						transform: scale(1);
					}
					80% {
						transform: scale(1.05);
					}
				}
			}
		}
	}
	&__title {
		flex-shrink: 0;
		opacity: 0.5;
		margin: 0;
	}
	&__set {
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		opacity: 0.25;
		margin: 0;
	}
	&__character {
		width: 1em;
		height: 1em;
		color: currentColor;
		font-size: 0.75em;
		// background-color: rgba(0, 0, 0, 0.5);
		line-height: 1.5em;
		text-align: center;
		// color: white;
		margin: 0.1em;
	}
}
</style>
