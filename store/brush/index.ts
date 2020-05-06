import Vue from 'vue';
import { BrushStateType, SetBrushArgType } from '@/types';

export const state = (): BrushStateType => ({
	size: 20,
	color: '#000000',
	opacity: 100,
	smooth: 50,
	pressure: 1
});

export const mutations = {
	SET_BRUSH: (state: BrushStateType, settings: SetBrushArgType) => {
		Vue.set(state, settings.type, settings.value);
	}
};

export const getters = {
	getSize(state: BrushStateType): number {
		return state.size;
	},
	getColor(state: BrushStateType): string {
		return state.color;
	},
	getSmooth(state: BrushStateType): number {
		return state.smooth;
	},
	getPressure(state: BrushStateType): number {
		return state.pressure;
	},
	getOpacity(state: BrushStateType): number {
		return state.opacity;
	},
	getBrush(state: BrushStateType): BrushStateType {
		return state;
	}
};
export const actions = {
	setBrush({ commit }: any, settings: SetBrushArgType): void {
		commit('SET_BRUSH', settings);
	},
	setColor({ commit }: any, value: string) {
		commit('SET_COLOR', value);
	}
};
