import { Coordinates2D } from "./Vector2";

export default class Circle {
    private x: number;
    private y: number;
    private r: number;

    constructor(x: number, y: number, r: number) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    /** credit https://stackoverflow.com/a/12221389/6882565 ;) */
    static intersection = (circle1: Circle, circle2: Circle) => {
        let a, dx, dy, d, h, rx, ry;
        let x2, y2;

        /* dx and dy are the vertical and horizontal distances between
         * the circle centers.
         */
        dx = circle2.x - circle1.x; // x1 - x0;
        dy = circle2.y - circle1.y; // y1 - y0;

        /* Determine the straight-line distance between the centers. */
        d = Math.hypot(dy, dx);

        if (d > (circle1.r + circle2.r)) {
            /* no solution. circles do not intersect. */
            return [];
        }
        if (d < Math.abs(circle1.r - circle2.r)) {
            /* no solution. one circle is contained in the other */
            return [];
        }

        /* 'point 2' is the point where the line through the circle
         * intersection points crosses the line between the circle
         * centers.
         */

        /* Determine the distance from point 0 to point 2. */
        a = ((circle1.r * circle1.r) - (circle2.r * circle2.r) + (d * d)) / (2.0 * d);

        /* Determine the coordinates of point 2. */
        x2 = circle1.x + (dx * a / d);
        y2 = circle1.y + (dy * a / d);

        /* Determine the distance from point 2 to either of the
         * intersection points.
         */
        h = Math.sqrt((circle1.r * circle1.r) - (a * a));

        /* Now determine the offsets of the intersection points from
         * point 2.
         */
        rx = -dy * (h / d);
        ry = dx * (h / d);

        /* Determine the absolute intersection points. */
        var xi = x2 + rx;
        var xi_prime = x2 - rx;
        var yi = y2 + ry;
        var yi_prime = y2 - ry;

        return [{ x: xi, y: yi }, { x: xi_prime, y: yi_prime }] as Coordinates2D[];
    }
}