<template>
	<div class="font-settings" :class="{ 'font-settings--active': isActive }">
		<div
			v-if="!init"
			class="font-settings__background"
			@click="isActive = false"
		></div>
		<div class="font-settings__container">
			<div class="spacer"></div>
			<div class="font-settings__modal">
				<div class="font-settings__shadow"></div>
				<div class="font-settings__panel">
					<div class="font-settings__content">
						<h2>Settings</h2>
						<p v-if="init">
							We need some info about the font you want to make. You can change
							anything later aswell, so don't worry.
						</p>
					</div>

					<!-- VIEW DETAILS -->
					<form v-if="charSets" class="font-settings__form form--stack">
						<h4>Font details</h4>
						<div
							class="input-field input-field--text"
							:class="{ 'input-field--inline': !init }"
						>
							<input
								v-model="fontTitle"
								placeholder="My Font Title"
								class="input-field__input input-field__input--text input--text"
								type="text"
							/>

							<label class="input-field__label">Title</label>
						</div>
						<div
							class="input-field input-field--text"
							:class="{ 'input-field--inline': !init }"
						>
							<input
								v-model="fontVariation"
								placeholder="ex. Regular, Bold, Condensed, etc.."
								class="input-field__input input-field__input--text input--text"
								type="text"
								list="variationSuggestion"
							/>
							<label class="input-field__label">Variation</label>
							<datalist id="variationSuggestion">
								<option>Light</option>
								<option>Regular</option>
								<option>Bold</option>
							</datalist>
						</div>
						<div
							class="input-field input-field--text"
							:class="{ 'input-field--inline': !init }"
						>
							<input
								v-model="fontStyle"
								placeholder="ex. Normal, Italic, etc.."
								class="input-field__input input-field__input--text input--text"
								type="text"
								list="styleSuggestions"
							/>
							<label class="input-field__label">Style</label>
							<datalist id="styleSuggestions">
								<option>Normal</option>
								<option>Italic</option>
							</datalist>
						</div>
					</form>

					<!-- VIEW DETAILS -->

					<form
						v-if="charSets && !init"
						class="font-settings__form form--stack"
					>
						<h4>View settings</h4>
						<div
							class="input-field input-field--range"
							:class="{ 'input-field--inline': !init }"
						>
							<input
								v-model="glyphOpacity"
								class="input-field__input input-field__input--range input--range"
								type="range"
							/>
							<label class="input-field__label">Glyph Opacity</label>
						</div>
						<div
							class="input-field input-field--range"
							:class="{ 'input-field--inline': !init }"
						>
							<select v-model="colorMode">
								<option value="light">Light mode</option>
								<option value="dark">Dark mode</option>
							</select>
							<label class="input-field__label">Mode</label>
						</div>
					</form>
					<div class="font-settings__sets">
						<h4 class="options__section-title">Choose your characters</h4>
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
			</div>
			<button class="button font-settings__save-button" @click="saveSettings">
				Save & Go
			</button>
			<div class="spacer"></div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GlyphSetType } from '@/types';
export default Vue.extend({
	props: {
		init: {
			type: Boolean,
			default: false
		}
	},
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

		fontStyle: {
			get(): string {
				return this.$store.getters['glyphs/getSettings'].style;
			},
			set(value: string): void {
				this.$store.dispatch('glyphs/setStyle', value);
			}
		},
		glyphOpacity: {
			get(): number {
				return this.$store.getters['view/getOpacity'];
			},
			set(value: number): void {
				this.$store.dispatch('view/setView', { type: 'opacity', value });
			}
		},
		colorMode: {
			get(): number {
				return this.$store.getters['ui/getColorMode'];
			},
			set(value: string): void {
				this.$store.dispatch('ui/setMode', value);
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
			if (this.$props.init) {
				this.$store.dispatch('ui/setLoading', true);
				this.$router.push({ path: 'draw' });
			}
			this.isActive = false;
		}
	}
});
</script>
<style lang="scss">
@import '~tools';
.spacer {
	display: block;
	height: 2em;
}
.font-settings {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	height: 100vh;
	transform: scale(0);
	overflow: scroll;
	opacity: 0;
	transition: transform 0.25s 0.25s ease-in-out, opacity 0.25s ease-in-out;
	pointer-events: none;

	&--active {
		transform: scale(1);
		opacity: 1;
		transition: transform 0s ease-in-out, opacity 0.25s ease-in-out;
		pointer-events: all;
		.font-settings__background {
			opacity: 1;
			transition: opacity 0.5s 0.5s;
		}
	}

	&__background {
		position: absolute;
		top: 0;

		bottom: 0;
		left: 50%;
		width: 100vw;
		background-color: rgba(0, 0, 0, 0.25);
		transform: translateX(-50%);
		opacity: 0;
		transition: opacity 1s 1s;
	}
	&__content {
		padding: grid(1);
		@include max-(padding, 1, 40);
		@include min-(padding, 1, 20);
	}
	&__form {
		display: block;
		border-radius: $base-border-radius;
		padding: grid(1);
		@include max-(padding, 1, 40);
		@include min-(padding, 1, 20);
		@include soft();
	}
	&__sets {
		@include soft();
	}
	&__container {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		max-width: 640px;
	}
	&__modal {
		position: relative;
	}
	&__panel {
		position: relative;
		z-index: 2;
		box-shadow: 0 0.25em 0 0 color(PinkLight);
		border-radius: $base-border-radius-xl;
		background-color: white;
		> *:last-child {
			border-radius: 0 0 $base-border-radius-xl $base-border-radius-xl;
		}
	}
	&__shadow {
		position: absolute;
		@include shadow();
	}
	&__save-button {
		z-index: 3;
		width: auto;
		margin: 1em;
	}
}
.options {
	padding: 1em;
	width: 100%;
	&__section-title {
		padding: grid(0.5 1);
		@include max-(1, 40) {
			padding: 20px 40px;
		}
		@include min-(1, 20) {
			padding: 20px 20px;
		}
	}
	&__list {
		display: flex;
		max-height: 50vh;
		overflow-x: scroll;
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
