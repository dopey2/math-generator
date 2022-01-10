import Circle from "../../Circle";
import MathX from "../../MathX/MathX";
import Polygon from "../Polygon/Polygon";

type TriangleMathParams = {
    sides?: number[];
}

export default class Triangle {
    sides: number[] = [];

    constructor(A: number, B: number, C: number) {
        this.sides.push(A);
        this.sides.push(B);
        this.sides.push(C);
    }

    // SSS
    static withSize = (AB: number, BC: number, AC: number) => {
        return new Triangle(AB, BC, AC);
    }


    getAngles: () => number[] = () => {
        // cos A = (b2 + c2 − a2) / 2bc
        const [a, b, c] = this.sides;

        const cosA = (b ** 2 + c ** 2 - a ** 2) / (2 * b * c);
        const A = MathX.radianToDeg(Math.acos(cosA));

        const cosB = (c ** 2 + a ** 2 - b ** 2) / (2 * c * a);
        const B = MathX.radianToDeg(Math.acos(cosB));
        const C = 180 - (A + B);

        return [A, B, C];
    }

    getAngleA: () => number = () => {
        return this.getAngles()[0];
    }

    getAngleB: () => number = () => {
        return this.getAngles()[1];
    }

    getAngleC: () => number = () => {
        return this.getAngles()[2];
    }

    toPolygon : () => Polygon = () => {
        const [a, b, c] = this.sides;

        const circle1 = new Circle(0, 0, c);
        const circle2 = new Circle(a, 0, b);
        const intersections = Circle.intersection(circle1, circle2);
        const intersection = intersections[0];

        return new Polygon([
            [0, 0],
            [a, 0],
            [intersection.x, intersection.y],
        ])
    }
}