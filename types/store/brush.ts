export type BrushStateType = {
	size: number;
	color: string;
	opacity: number;
	smooth: number;
	pressure: number;
};
export interface SetBrushArgType {
	value: string;
	type: 'size' | 'color' | 'opacity' | 'smooth' | 'pressure';
}
