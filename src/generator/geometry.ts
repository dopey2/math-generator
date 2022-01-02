import { toMultilineLatex } from "./utils";
import { BaseOperationMethods } from "./arithmetics/arithmetics";
import { Vector2 } from "../math";
import MathX from "../math/MathX";

export interface Triangle {
    points: { x: number, y: number, label?: string }[]
    vectors: Vector2[],
    AB: number;
    BC: number;
    AC: number;
    knowSide: number[];
}

export const pythagore: BaseOperationMethods = () => {
    const AB = MathX.random(2, 20);
    const angleA = MathX.random(35, 65);
    const tan = Math.tan(angleA * Math.PI / 180);
    const BC = Math.floor(tan * AB);
    const AC = Math.hypot(AB, BC);


    const points = [
        { x: 0, y: 0, label: 'A' },
        { x: 0, y: AB, label: 'B' },
        { x: BC, y: AB, label: 'C' }
    ];

    const vectors = [
        new Vector2(0, AB),
        new Vector2(BC, 0),
        new Vector2(0 - BC, 0 - AB)
    ];

    const ABsquare = Math.pow(AB, 2);
    const BCSquare = Math.pow(BC, 2);
    const result = Math.sqrt(ABsquare + BCSquare);

    const steps = [
        `AC^2 = AB^2 + BC^2`,
        `AC = \\sqrt{${AB}^2 + ${BC}^2}`,
        `AC = \\sqrt{${ABsquare} + ${BCSquare}}`,
        `AC = \\sqrt{${ABsquare + BCSquare}}`
    ];

    result === Math.floor(result) && steps.push(`AC = ${result}`);

    return {
        type: "geometry",
        expression: "",
        triangle: {
            points,
            vectors,
            AB,
            BC,
            AC,
            knowSide: [0, 1],
        },
        latex: toMultilineLatex([
            `Soit ABC un triangle rectangle en B`,
            `AB=${AB};  BC=${BC};`,
            `Calculer AC`
        ]),
        latexValue: "",
        steps: steps,
    };
};

export const triangleOneAngleOneSide = () => {
    const AB = MathX.random(2, 20);
    const angleB = MathX.random(35, 65);

    const tan = 1;
    const BC = Math.floor(tan * AB);
    const AC = Math.sqrt(Math.pow(AB, 2) + Math.pow(BC, 2));

    const ABsquare = Math.pow(AB, 2);
    const BCSquare = Math.pow(BC, 2);

    const result = Math.sqrt(ABsquare + BCSquare);

    const steps = [
        `AC^2 = AB^2 + BC^2`,
        `AC = \\sqrt{${AB}^2 + ${BC}^2}`,
        `AC = \\sqrt{${ABsquare} + ${BCSquare}}`,
        `AC = \\sqrt{${ABsquare + BCSquare}}`
    ];

    result === Math.floor(result) && steps.push(`AC = ${result}`);

    return {
        type: "geometry",
        expression: "",
        triangle: {
            AB,
            BC,
            AC,
            label: {
                AB: true,
                BC: true,
                square: true,
            },
        },
        latex: 'Calculer \\space AC',
        latexValue: "",
        steps: steps,
    };
};

