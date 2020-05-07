export interface GlyphDataType {
	data: string | undefined;
	unicode: string | number;
	glyph: string;
}
export interface GlyphSetType {
	name: string;
	title: string;
	active?: boolean;
	data?: GlyphDataType[];
	characters: Array<string>;
	id: string;
}
