import Vue from 'vue';
import { GlyphsStateType } from './types';
import { Characters, CharactersType } from '~/assets/characters.ts';

export const state = (): GlyphsStateType => ({
	characters: Characters
});

export const mutations = {
	TOGGLE_CHARSET: (state: GlyphsStateType, value: string) => {
		const foundCharset = state.characters.find((set) => set.name === value);
		if (foundCharset) Vue.set(foundCharset, 'active', !foundCharset.active);
	}
};

export const getters = {
	getCharacterSets(state: GlyphsStateType): CharactersType[] {
		return state.characters;
	},
	getActiveCharacterSets(state: GlyphsStateType): CharactersType[] {
		return state.characters.filter((set) => set.active === true);
	}
};

export const actions = {
	toggleCharset({ commit }: any, name: string) {
		commit('TOGGLE_CHARSET', name);
	}
};
