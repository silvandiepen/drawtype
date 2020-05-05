<template>
	<div class="settings--brush">
		<div
			class="settings__brush-preview"
			:style="
				`--brush-opacity: ${brushOpacity}; --brush-size: ${brushSize};--brush-color: ${brushColor};`
			"
		/>
		<div class="settings__fields">
			<div class="input-field">
				<input
					v-model="brushSize"
					class="input-field__input--range input--range"
					type="range"
					min="1"
					max="100"
				/>
				<label>Size</label>
				<!-- <span class="input-field__value">{{ brushSize }}</span> -->
			</div>
			<div class="input-field">
				<input
					v-model="brushOpacity"
					class="input-field__input--range input--range"
					type="range"
					min="1"
					max="100"
				/>
				<label>Opacity</label>
				<!-- <span class="input-field__value">{{ brushOpacity }}</span> -->
			</div>
			<!-- <div class="input-field">
				<input v-model="brushSmoothness" type="range" min="1" max="100" />
				<label>Smoothness</label>
				<span class="input-field__value">{{ brushSmoothness }}</span>
			</div> -->
			<div class="input-field">
				<input
					v-model="brushColor"
					class="input-field__input--color"
					type="color"
				/>
				<label>Color</label>
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
	// opacity: calc((var(--brush-opacity, 1) / 100));
}
.settings {
	&--brush {
		color: currentColor;
		padding: 0;
	}
}
.settings--brush {
	.settings__fields {
		display: flex;
		flex-direction: column;
	}
	.input-field {
		flex-direction: row-reverse;
		writing-mode: bt-lr; /* IE */
		padding: 0.5em;
		&__value {
			position: absolute;
			top: 100%;
			border: 1px solid red;
		}
		label {
			position: absolute;
			right: 100%;
			writing-mode: vertical-lr;
		}
		.input--range {
			width: 2em;
			-webkit-appearance: slider-vertical; /* WebKit */
		}
	}
}
</style>
