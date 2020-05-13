export type BrushTypes = 'brush' | 'eraser';

export type BrushStateType = {
	size: number;
	color: string;
	opacity: number;
	smooth: number;
	pressure: number;
	type: BrushTypes;
};
export interface SetBrushArgType {
	value: string;
	type: 'size' | 'color' | 'opacity' | 'smooth' | 'pressure';
}
