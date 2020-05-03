export type ViewStateType = {
	size: number;
	opacity: string;
};
export interface SetViewArgType {
	value: string;
	type: 'size' | 'opacity';
}
