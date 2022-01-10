import Vector2 from "../../Vector2";

export default class Polygon {
    points!: number[][];

    constructor(vectors: Vector2[]);
    constructor(points: number[][]);
    constructor(...args: any[]) {
        if (args[0] && typeof args[0][0] === 'number') {
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
        for (let i = 0; i < this.points.length; i++) {
            this.points[i][0] *= k;
            this.points[i][1] *= k;
        }
        return this;
    };

    adjustX = (x: number) => {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i][0] += x;
        }
        return this;
    };

    adjustY = (y: number) => {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i][1] += y;
        }
        return this;
    };

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

    toString = () => {
        let str = '';
        for (let i = 0; i < this.points.length; i++) {
            str += `${this.points[i][0]} ${this.points[i][1]},`;
        }
        return str;
    }
}