import { toMultilineLatex } from "../utils";
import Circle from "../../math/Circle";
import { Vector2 } from "../../math";
import { Coordinates2D } from "../../math/Vector2";
import MathX from "../../math/MathX";

export const randomTriangleLength = () => {
    const A = MathX.random(2, 10);
    let minB = A - 2;
    let maxB = A + 2;
    if (minB < 2) {
        minB += (2 - minB);
        maxB += (2 - maxB);
    }

    const B = MathX.random(minB, maxB);

    const min = Math.min(A, B);
    const max = Math.max(A, B);

    const C = MathX.random((max - min + 1), (A + B - 1));
    return [A, B, C];
};

export const randomTriangle = () => {
    const [AB, BC, AC] = randomTriangleLength();

    const circle1 = new Circle(0, 0, AC);
    const circle2 = new Circle(AB, 0, BC);
    const intersections = Circle.intersection(circle1, circle2);

    const intersection = MathX.random(0, 1) ? intersections[0] : intersections[1];

    const points = [
        { x: 0, y: 0, label: 'A' },
        { x: AB, y: 0, label: 'B' },
        { x: intersection.x, y: intersection.y, label: 'C' }
    ];

    const vectors = vectorsFromPoints(points);

    return {
        type: "geometry",
        expression: "",
        triangle: {
            points,
            vectors,
            AB,
            BC,
            AC,
            knowSide: [0, 1, 2],
        },
        latex: toMultilineLatex([
            `Test`
        ]),
        latexValue: "",
        steps: [],
    };

};


const vectorsFromPoints = (points: Coordinates2D[]) => {
    const vectors: Vector2[] = [];

    for (let i = 0; i < points.length; i++) {
        if (i === points.length - 1) {
            vectors.push(new Vector2(points[0].x - points[i].x, points[0].y - points[i].y));

        } else {
            vectors.push(new Vector2(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y));
        }
    }
    return vectors;
};