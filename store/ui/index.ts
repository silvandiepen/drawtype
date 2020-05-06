// import Vue from 'vue';
import { UIStateType, UIColorModes } from '@/types';

export const state = (): UIStateType => ({
	colorMode: 'light',
	menu: {
		active: false
	},
	currentActiveGlyph: ''
});

export const mutations = {
	SET_COLOR_MODE(state: UIStateType, value: UIColorModes) {
		state.colorMode = value;
	},
	TOGGLE_COLOR_MODE(state: UIStateType) {
		if (state.colorMode === 'light') state.colorMode = 'dark';
		else state.colorMode = 'light';
	},
	SET_MENU_ACTIVE(state: UIStateType, value: boolean) {
		state.menu.active = value;
	},
	SET_ACTIVE_GLYPH(state: UIStateType, value: string) {
		state.currentActiveGlyph = value;
	}
};

export const actions = {
	setDarkMode({ commit }: any) {
		commit('SET_COLOR_MODE', 'dark');
	},
	setLightMode({ commit }: any) {
		commit('SET_COLOR_MODE', 'light');
	},
	toggleColorMode({ commit }: any) {
		commit('TOGGLE_COLOR_MODE');
	},
	setMode({ commit }: any, value: UIColorModes) {
		commit('setMode', value);
	},
	setMenuActive({ commit }: any, value: boolean) {
		commit('SET_MENU_ACTIVE', value);
	},
	toggleMenuActive({ commit, state }: any) {
		commit('SET_MENU_ACTIVE', !state.menu.active);
	},
	setActiveGlyph({ commit }: any, value: string) {
		commit('SET_ACTIVE_GLYPH', value);
	}
};
