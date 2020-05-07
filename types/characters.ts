export interface CharacterData {
	data: string | undefined;
	unicode: string | number;
	glyph: string;
}
export interface CharactersType {
	name: string;
	title: string;
	active?: boolean;
	data?: CharacterData[];
	characters: Array<string>;
	id: string;
}
