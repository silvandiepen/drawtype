import { CharactersType } from '@/types';
export interface GlyphsSettingsType {
	title: string;
	variation: string;
}

export type GlyphsStateType = {
	characters: CharactersType[];
	settings: GlyphsSettingsType;
};
