import Vue from 'vue';
import {
	GlyphsStateType,
	CharactersType,
	GlyphsSettingsType,
	CharacterData
} from '@/types';
import { Characters } from '~/assets/characters.ts';

export const state = (): GlyphsStateType => ({
	settings: {
		title: '',
		variation: ''
	},
	characters: []
});

export const findByValue = (obj: any, key: string, value: string): any => {
	let result;
	for (const p in obj) {
		if (obj[key] === value) {
			return obj;
		} else if (typeof obj[p] === 'object') {
			result = findByValue(obj[p], key, value);
			if (result) {
				return result;
			}
		}
	}
	return result;
};

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
						unicode: char.charCodeAt(0),
						data: undefined
					};
				})
			};
		});

		state.characters = charsets;
	},
	SET_TITLE: (state: GlyphsStateType, value: string) => {
		state.settings.title = value;
	},
	SET_VARIATION: (state: GlyphsStateType, value: string) => {
		state.settings.variation = value;
	},
	SET_GLYPH_DATA: (state: GlyphsStateType, data: SetGlyphOpts) => {
		const glyphSet = state.characters.find((set) => set.id === data.set);
		let char = null;
		if (glyphSet?.data?.length)
			char = glyphSet.data.filter(
				(character: CharacterData) => character.unicode === data.unicode
			)[0];
		if (char) Vue.set(char, 'data', data.data);
	}
};

interface GetGlyphOpts {
	set: string;
	unicode: number;
}
interface SetGlyphOpts extends GetGlyphOpts {
	data: string;
}
export const getters = {
	getGlyph: (state: GlyphsStateType) => (
		data: GetGlyphOpts
	): CharacterData | null => {
		const glyphSet = state.characters.find((set) => set.id === data.set);
		let char = null;
		if (glyphSet?.data?.length)
			char = glyphSet.data.filter(
				(character: CharacterData) => character.unicode === data.unicode
			)[0];

		return char;

		// return state.characters[0];
	},
	getCharacterSets(state: GlyphsStateType): CharactersType[] | null {
		return state.characters;
	},
	getActiveCharacterSets(state: GlyphsStateType): CharactersType[] | null {
		return state.characters.filter((set) => set.active === true);
	},
	getSettings(state: GlyphsStateType): GlyphsSettingsType {
		return state.settings;
	},
	getActive: (state: GlyphsStateType) => (unicode: string) => {
		const char = findByValue(state.characters, 'unicode', unicode);
		return char.active;
	}
};

export const actions = {
	setCharacterSets({ commit, state }: any) {
		if (state.characters.length < 1) commit('SET_CHARACTERSETS', Characters);
	},
	toggleCharset({ commit }: any, name: string) {
		commit('TOGGLE_CHARSET', name);
	},
	setTitle({ commit }: any, value: string) {
		commit('SET_TITLE', value);
	},
	setVariation({ commit }: any, value: string) {
		commit('SET_VARIATION', value);
	},
	setGlyphData({ commit }: any, data: SetGlyphOpts) {
		commit('SET_GLYPH_DATA', data);
	}
};
