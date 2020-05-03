declare const fabric: any;
declare class PSPoint extends fabric.Point {
	type: string;
	pressure: number;
	constructor(x: number, y: number, pressure: number);
	midPointFrom(p: PSPoint): PSPoint;
	clone(): PSPoint;
}
export default PSPoint;
