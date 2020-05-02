import { ViewStateType } from './types';

export const state = (): ViewStateType => ({
	size: 10
});

export const mutations = {
	SET_SIZE: (state: ViewStateType) => (value: number) => {
		state.size = value;
	}
};

export const getters = {
	getSize(state: ViewStateType): number {
		return state.size;
	}
};
export const actions = {
	setSize({ commit }: any, value: number): void {
		commit('SET_SIZE', value);
	}
};
