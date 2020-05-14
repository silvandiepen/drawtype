<template>
	<div class="settings--brush">
		<div
			class="settings__brush-preview"
			:style="
				`--brush-opacity: ${parseInt(brushOpacity) /
					100}; --brush-size: ${brushSize};--brush-color: ${brushColor};`
			"
		/>
		<div class="settings__fields">
			<div class="input-field input-field--range">
				<input
					v-model="brushSize"
					class="input-field__input--range input--range input--range__size"
					type="range"
					min="1"
					max="100"
				/>
				<label>
					<span class="input-field__value">{{ brushSize }}</span>
					<span class="input-field__label_text">Size</span>
				</label>
				<!-- <span class="input-field__value">{{ brushSize }}</span> -->
			</div>
			<div class="input-field input-field--range">
				<input
					v-model="brushOpacity"
					class="input-field__input--range input--range input--range__opacity"
					type="range"
					min="0"
					max="100"
				/>
				<label>
					<span class="input-field__value">{{ brushOpacity }}%</span>
					<span class="input-field__label_text">Opacity</span>
				</label>
				<!-- <span class="input-field__value">{{ brushOpacity }}</span> -->
			</div>
			<!-- <div class="input-field">
				<input v-model="brushSmoothness" type="range" min="1" max="100" />
				<label>Smoothness</label>
				<span class="input-field__value">{{ brushSmoothness }}</span>
			</div> -->
			<div class="input-field input-field--color">
				<input
					v-model="brushColor"
					class="input-field__input--color input--color"
					type="color"
				/>
				<label>
					<span class="input-field__value">{{ brushColor }}</span>
					<span class="input-field__label_text">Color</span>
				</label>
				<!-- <span class="input-field__value">{{ brushColor }}</span> -->
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
				return this.$store.getters['brush/getOpacity'];
			}
		},
		brushSmoothness: {
			set(value: number) {
				this.$store.dispatch('brush/setBrush', { type: 'smoothness', value });
			},
			get(): number {
				return this.$store.getters['brush/getSmoothness'];
			}
		},
		brushColor: {
			set(value: number) {
				this.$store.dispatch('brush/setBrush', { type: 'color', value });
			},
			get(): number {
				return this.$store.getters['brush/getColor'];
			}
		}
	}
});
</script>
<style lang="scss">
@import '~tools';
.settings__brush-preview {
	position: absolute;
	right: 50%;
	bottom: calc(100% + 1em);
	display: block;
	width: calc((var(--brush-size, 10) / 30) * 1em);
	height: calc((var(--brush-size, 10) / 30) * 1em);
	border-radius: 50%;
	background-color: var(--brush-color, black);
	transform: translate(50%, 0%);
	opacity: var(--brush-opacity);
}
.settings {
	&--brush {
		color: currentColor;
		margin-top: 0.5em;
		color: black;
	}
}
.settings--brush {
	.settings__fields {
		display: flex;
		flex-direction: column;
	}
	.input-field {
		// writing-mode: bt-lr; /* IE */
		padding: 0em;
		&--range {
			width: 2em;
			height: 11em;
		}
		&__label {
			opacity: 1;
		}
		&__label_text {
			opacity: 0.25;
		}
		&__value {
			// position: absolute;
			// top: 100%;
			// border: 1px solid red;
		}
		label {
			position: absolute;
			right: calc(100% + 0.5em);
			writing-mode: vertical-lr;
			padding: 0;
		}
		.input--color {
			// border: 2px solid black;
			// border-radius: 0.25em;
			// input[type='color'] {
			width: 1.5em;
			height: 1.5em;
			border: none;
			padding: 0;
			border-radius: $base-border-radius;
			-webkit-appearance: none;

			&::-webkit-color-swatch-wrapper {
				padding: 0;
				border-radius: $base-border-radius;
			}
			&::-webkit-color-swatch {
				border: none;
				border-radius: $base-border-radius;
			}
			&:focus {
				outline: 2px solid white;
			}
		}
		.input--range {
			position: absolute;
			top: 0;
			left: 0;
			width: 10em;
			background-color: transparent;
			// -webkit-appearance: slider-vertical; /* Does work, but not with styling :(  */
			transform: translateY(-100%) rotate(90deg);
			transform-origin: 0 100%;
			@include input-range-track(false) {
				border: 2px solid currentColor;
			}
			&__opacity,
			&__size {
				&::-webkit-slider-runnable-track {
					border: 2px solid transparent;
					background-color: transparent;
					background-repeat: no-repeat;
					background-size: 110% 110%;
				}
				&::-webkit-slider-thumb {
					box-shadow: 0 0 0.5em 0em rgba(0, 0, 0, 0.25);
				}
			}
			&__opacity {
				&::-webkit-slider-runnable-track {
					background-image: linear-gradient(to left, black, transparent);
				}
			}
			&__size {
				&::-webkit-slider-runnable-track {
					background-image: linear-gradient(
						to left bottom,
						black 49%,
						transparent 51%
					);
				}
			}
		}
	}
}
</style>
