import Vue from 'vue';
import { GlyphsStateType, CharactersType } from '@/types';
import { Characters } from '~/assets/characters.ts';

export const state = (): GlyphsStateType => ({
	title: 'draw',
	characters: undefined
});

export const mutations = {
	TOGGLE_CHARSET: (state: GlyphsStateType, value: string) => {
		if (state.characters) {
			const foundCharset = state.characters.find((set) => set.name === value);
			if (foundCharset) Vue.set(foundCharset, 'active', !foundCharset.active);
		}
	},
	SET_CHARACTERSETS: (state: GlyphsStateType, value: CharactersType[]) => {
		const charsets = value.map((charset) => {
			return {
				...charset,
				data: charset.characters.map((char: string) => {
					return {
						glyph: char,
						unicode: String.fromCharCode(parseInt(char, 16)),
						data: undefined
					};
				})
			};
		});

		state.characters = charsets;
	},
	SET_TITLE: (state: GlyphsStateType, value: string) => {
		state.title = value;
	}
};

export const getters = {
	getCharacterSets(state: GlyphsStateType): CharactersType[] | undefined {
		if (state.characters) return state.characters;
	},
	getActiveCharacterSets(state: GlyphsStateType): CharactersType[] | undefined {
		if (state.characters)
			return state.characters.filter((set) => set.active === true);
	},
	getTitle(state: GlyphsStateType): string {
		return state.title;
	}
};

export const actions = {
	setCharacterSets({ commit }: any) {
		commit('SET_CHARACTERSETS', Characters);
	},
	toggleCharset({ commit }: any, name: string) {
		commit('TOGGLE_CHARSET', name);
	},
	setTitle({ commit }: any, value: string) {
		commit('SET_TITLE', value);
	}
};
