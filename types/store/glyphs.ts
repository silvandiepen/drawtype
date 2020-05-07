import { GlyphSetType } from '@/types';
export interface GlyphSettingsType {
	title: string;
	variation: string;
	style: string;
}

export type GlyphStateType = {
	characters: GlyphSetType[];
	settings: GlyphSettingsType;
};
