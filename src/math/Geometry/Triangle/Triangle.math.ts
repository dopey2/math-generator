import Circle from "../Circle";
import MathX from "../../MathX/MathX";
import Polygon from "../Polygon/Polygon";

export default class Triangle {
    sides: number[] = [];

    constructor(a: number, b: number, c: number) {
        this.sides.push(a);
        this.sides.push(b);
        this.sides.push(c);
    }

    // SSS
    static withSide = (a: number, b: number, c: number) => {
        return new Triangle(a, b, c);
    };

    /**
     * @param {number} A The first angle
     * @param {number} B The second angle
     * @param {number} B The third angle
     * @param {number} a The side opposite to angle A
     * @param {number} b The side opposite to angle B
     * @param {number} c The side opposite to angle C
     */
    static with3AnglesAnd1Side = (
        A: number,
        B: number,
        C: number,
        a: number | null,
        b: number | null,
        c: number | null
    ) => {
        if(a === null && b === null && c === null) {
            throw new Error("You need at least one side");
        }
        const angles = [A, B, C];
        const sides = [a, b, c];

        // a / sin A === b / sin B === c / sin C

        const knownSideIndex: number = sides.findIndex((v: number | null) => v !== null);
        const sinX = sides[knownSideIndex] as number / Math.sin(MathX.degToRadian(angles[knownSideIndex]));

        const solvedSides: number[] = [];

        for(let i = 0; i < 3; i++) {
            const index = (knownSideIndex + i) % 3;
            const angle = angles[index];
            const side = sinX * Math.sin(MathX.degToRadian(angle));
            solvedSides[index] = side;
        }

        solvedSides[knownSideIndex] = sides[knownSideIndex] as number;
        return Triangle.withSide(solvedSides[2], solvedSides[0], solvedSides[1]);
    };


    getAngles: () => number[] = () => {
        // cos A = (b2 + c2 − a2) / 2bc
        const [a, b, c] = this.sides;

        const cosA = (b ** 2 + c ** 2 - a ** 2) / (2 * b * c);
        const A = MathX.radianToDeg(Math.acos(cosA));

        const cosB = (c ** 2 + a ** 2 - b ** 2) / (2 * c * a);
        const B = MathX.radianToDeg(Math.acos(cosB));
        const C = 180 - (A + B);

        return [C, A, B];
    };

    getAngleA: () => number = () => {
        return this.getAngles()[0];
    };

    getAngleB: () => number = () => {
        return this.getAngles()[1];
    };

    getAngleC: () => number = () => {
        return this.getAngles()[2];
    };

    toPolygon : () => Polygon = () => {
        const [a, b, c] = this.sides;

        const circle1 = new Circle(0, 0, c);
        const circle2 = new Circle(a, 0, b);
        const intersections = Circle.intersection(circle1, circle2);
        const intersection = intersections[0];

        return new Polygon([
            [0, 0],
            [a, 0],
            [intersection.x, intersection.y]
        ]);
    }
}