export type BrushStateType = {
	size: string;
	color: string;
	opacity: string;
	smooth: string;
	pressure: string;
};
export interface SetBrushArgType {
	value: string;
	type: 'size' | 'color' | 'opacity' | 'smooth' | 'pressure';
}
