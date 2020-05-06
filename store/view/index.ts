import Vue from 'vue';
import { ViewStateType, SetViewArgType } from '@/types';

export const state = (): ViewStateType => ({
	size: 10,
	opacity: '12'
});

export const mutations = {
	SET_VIEW: (state: ViewStateType, settings: SetViewArgType) => {
		Vue.set(state, settings.type, settings.value);
	}
};

export const getters = {
	getSize(state: ViewStateType): number {
		return state.size;
	},
	getOpacity(state: ViewStateType): number {
		return parseInt(state.opacity);
	}
};
export const actions = {
	setView({ commit }: any, settings: SetViewArgType): void {
		commit('SET_VIEW', settings);
	}
};
