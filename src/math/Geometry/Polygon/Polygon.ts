import MathX from "../../MathX/MathX";

export default class Polygon {
    points!: number[][];

    constructor(points: number[][]) {
        this.points = points;
    }

    scale = (k: number) => {
        let points = [];
        for (let i = 0; i < this.points.length; i++) {
            points.push([
                this.points[i][0] * k,
                this.points[i][1] * k
            ]);
        }

        return new Polygon(points);
    };

    scaleXY = (x: number, y: number) => {
        let points = [];
        for (let i = 0; i < this.points.length; i++) {
            points.push([
                this.points[i][0] *= x,
                this.points[i][1] *= y
            ]);
        }
        return new Polygon(points);
    };

    adjustToFit = () => {
        const [cX, cY] = this.getCentroid();
        const longestVerticesFromCenterLength = this.getCircumcircleRadius();
        return this.adjustX(longestVerticesFromCenterLength - cX).adjustY(longestVerticesFromCenterLength - cY);
    };

    scaleToFit = (width: number, height: number) => {
        const l = this.getLongestEdge();
        return this.scaleXY(width / l, height / l);
    };

    adjustX = (x: number) => {
        let points = [];
        for (let i = 0; i < this.points.length; i++) {
            points.push([
                this.points[i][0] + x,
                this.points[i][1]
            ]);
        }
        return new Polygon(points);
    };

    adjustY = (y: number) => {
        let points = [];
        for (let i = 0; i < this.points.length; i++) {
            points.push([
                this.points[i][0],
                this.points[i][1] + y
            ]);
        }
        return new Polygon(points);
    };

    rotate = (deg: number = 0) => {
        const [x, y] = this.getCentroid();
        return this.rotateAround(deg, x, y);
    };

    rotateAround = (deg: number, xC: number, yC: number) => {
        let points: number[][] = [];

        const rad = MathX.degToRadian(deg);

        this.points.forEach((p) => {
            const [x, y] = p;

            points.push([
                (x - xC) * Math.cos(rad) - (y - yC) * Math.sin(rad) + xC,
                (y - yC) * Math.cos(rad) + (x - xC) * Math.sin(rad) + yC
            ]);
        });

        return new Polygon(points);
    };

    getCentroid = () => {
        let x = 0;
        let y = 0;

        this.points.forEach((p) => {
            x += p[0];
            y += p[1];
        });

        x /= this.points.length;
        y /= this.points.length;

        return [x, y];
    };

    getLongestEdge = () => {
        let max = 0;

        for (let i = 0; i < this.points.length; i++) {
            const [x1, y1] = this.points[i];
            for (let j = 0; j < this.points.length; j++) {
                const [x2, y2] = this.points[j];
                const l = Math.hypot(x2 - x1, y2 - y1);
                if (l > max) {
                    max = l;
                }
            }
        }
        return max;
    };

    getCircumcircleRadius = () => {
        let max = 0;

        const [xC, yC] = this.getCentroid();

        for (let i = 0; i < this.points.length; i++) {
            const [x, y] = this.points[i];
            const l = Math.hypot(x - xC, y - yC);
            if (l > max) {
                max = l;
            }
        }
        return max;
    };

    getEdgesMidpoint = () => {
        const midpoints = [];

        for(let i = 0; i < this.points.length; i++) {
            const p1 = this.points[i];
            const p2 = i === this.points.length - 1 ? this.points[0] : this.points[i + 1];
            const x = (p2[0] + p1[0]) / 2;
            const y = (p2[1] + p1[1]) / 2;
            midpoints.push([x, y]);
        }

        return midpoints;
    };


    toString = () => {
        let str = '';
        for (let i = 0; i < this.points.length; i++) {
            str += `${this.points[i][0]} ${this.points[i][1]}${i === this.points.length - 1 ? '' : ','}`;
        }
        return str;
    }
}