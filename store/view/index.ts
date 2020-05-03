import Vue from 'vue';
import { ViewStateType, SetViewArgType } from '@/types';

export const state = (): ViewStateType => ({
	size: 10,
	opacity: '1'
});

export const mutations = {
	SET_VIEW: (state: ViewStateType) => (value: SetViewArgType) => {
		Vue.set(state, value.type, value.value);
	}
};

export const getters = {
	getSize(state: ViewStateType): number {
		return state.size;
	}
};
export const actions = {
	setView({ commit }: any, value: SetViewArgType): void {
		commit('SET_VIEW', value);
	}
};
