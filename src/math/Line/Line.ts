import Point2D from "../Point2D";

export default class Line {
    // y = mx + b

    m: number;
    b: number;

    constructor(m: number, x: number);
    constructor(x1: number, y1: number, x2: number, y2: number);
    constructor(point1: Point2D, point2: Point2D);
    constructor(...args: any) {
        if (args.legth === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
            this.m = args[0];
            this.b = args[1];
            return;
        }

        let point1: Point2D;
        let point2: Point2D;

        if (
            Object.getPrototypeOf(args[0]) === Point2D.prototype
            && Object.getPrototypeOf(args[1]) === Point2D.prototype
        ) {
            point1 = args[0];
            point2 = args[1];
        } else {
            point1 = new Point2D(args[0], args[1]);
            point2 = new Point2D(args[2], args[3]);
        }

        const yDiff = point2.y - point1.y;
        const xDiff = point2.x - point1.x;

        this.m = yDiff / xDiff;

        // y = mx + b
        const mx = this.m * point1.x;
        this.b = point1.y - mx;
    }

    getY = (x: number) => {
        return this.m * x + this.b;
    }
}