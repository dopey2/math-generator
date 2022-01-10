import MathX from "../../MathX/MathX";
import Vector2 from "../../Vector2";

export default class Polygon {
    points!: number[][];
    labels = [];

    constructor(vectors: Vector2[]);
    constructor(points: number[][]);
    constructor(...args: any[]) {
        if (args[0] && args[0][0] && typeof args[0][0][0] === 'number') {
            this.points = args[0];
        } else if (args[0] && args[0][0] && Object.getPrototypeOf(args[0][0]) === Vector2.prototype) {
            const points = [[0, 0]];
            let vector = args[0][0];
            points.push([vector.x, vector.y]);

            for (let i = 1; i < args[0].length; i++) {
                vector = vector.add(args[0][i]);
                points.push([vector.x, vector.y]);
            }
            this.points = points;
        }

        return this;
    }

    scale = (k: number) => {
        let points = [];
        for (let i = 0; i < this.points.length; i++) {
            points.push([
                this.points[i][0] * k,
                this.points[i][1] * k,
            ]);
        }
        return new Polygon(points);
    };

    scaleXY = (x: number, y: number) => {
        let points = [];
        for (let i = 0; i < this.points.length; i++) {
            points.push([
                this.points[i][0] *= x,
                this.points[i][1] *= y,
            ]);
        }
        return new Polygon(points);
    };


    adjustToFit = () => {
        const [cX, cY] = this.getCentroid();
        const [x, y] = this.points[0];

        const diffX = cX - x;
        const diffY = cY - y;

        const longestPairOfVertices = this.longestPairOfVertices();


        return this.adjustX(longestPairOfVertices / 2 - cX).adjustY(longestPairOfVertices / 2 - cY);

    }

    scaleToFit = (width: number, height: number) => {
        const l = this.longestPairOfVertices();
        return this.scaleXY(width / l, height / l)
    }

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
        const [x, y] = this.getCentroid()
        return this.rotateArround(deg, x, y);
    }

    rotateArround = (deg: number, xC: number, yC: number) => {
        let points: number[][] = [];

        const rad = MathX.degToRadian(deg);

        this.points.forEach((p) => {
            const [x, y] = p;

            points.push([
                (x - xC) * Math.cos(rad) - (y - yC) * Math.sin(rad) + xC,
                (y - yC) * Math.cos(rad) + (x - xC) * Math.sin(rad) + yC
            ])
        })

        return new Polygon(points);
    }


    getCentroid = () => {
        let x = 0;
        let y = 0;

        this.points.forEach((p) => {
            x += p[0];
            y += p[1];
        })

        x /= this.points.length;
        y /= this.points.length;

        return [x, y];
    }

    longestPairOfVertices = () => {
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
    }

    longestVerticesFromCenterLenght = () => {
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
    }


    getDimensions = () => {
        const xValues = this.points.map((p) => p[0]);
        const yValues = this.points.map((p) => p[1]);
        const x = Math.max(...xValues) - Math.min(...xValues);
        const y = Math.max(...yValues) - Math.min(...yValues);
        return [x, y];
    }

    toString = () => {
        let str = '';
        for (let i = 0; i < this.points.length; i++) {
            str += `${this.points[i][0]} ${this.points[i][1]}${i === this.points.length - 1 ? '' : ','}`;
        }
        return str;
    }
}