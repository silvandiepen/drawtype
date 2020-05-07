import { GlyphSetType } from '@/types';
export interface GlyphSettingsType {
	title: string;
	variation: string;
}

export type GlyphStateType = {
	characters: GlyphSetType[];
	settings: GlyphSettingsType;
};
