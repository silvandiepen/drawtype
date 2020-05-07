export type UIColorModes = 'dark' | 'light';

export interface MenuType {
	active: boolean;
}
export interface UIStateType {
	colorMode: UIColorModes;
	menu: MenuType;
	activeSettings: boolean;
	currentActiveGlyph: string;
}
