import Vue from 'vue';
import { BrushStateType, SetBrushArgType } from './types';

export const state = (): BrushStateType => ({
	size: 20,
	color: 'black',
	opacity: '1',
	smooth: 1,
	pressure: 1
});

export const mutations = {
	SET_SIZE: (state: BrushStateType) => (value: number) => {
		state.size = value;
	},
	SET_COLOR: (state: BrushStateType) => (value: string) => {
		state.color = value;
	},
	SET_BRUSH: (state: BrushStateType) => (value: SetBrushArgType) => {
		Vue.set(state, value.type, value.value);
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
	getOpacity(state: BrushStateType): string {
		return state.opacity;
	},
	getBrush(state: BrushStateType): BrushStateType {
		return state;
	}
};
export const actions = {
	setBrush({ commit }: any, value: SetBrushArgType): void {
		commit('SET_BRUSH', value);
	},
	setColor({ commit }: any, value: string) {
		commit('SET_COLOR', value);
	}
};
