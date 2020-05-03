import Vue from 'vue';
import { BrushStateType, SetBrushArgType } from '@/types';

export const state = (): BrushStateType => ({
	size: '20',
	color: 'black',
	opacity: '100',
	smooth: '50',
	pressure: '1'
});

export const mutations = {
	SET_BRUSH: (state: BrushStateType, settings: SetBrushArgType) => {
		Vue.set(state, settings.type, settings.value);
	}
};

export const getters = {
	getSize(state: BrushStateType): string {
		return state.size;
	},
	getColor(state: BrushStateType): string {
		return state.color;
	},
	getSmooth(state: BrushStateType): string {
		return state.smooth;
	},
	getPressure(state: BrushStateType): string {
		return state.pressure;
	},
	getOpacity(state: BrushStateType): string {
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
