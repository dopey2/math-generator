import {toMultilineLatex} from "./utils";
import {BaseOperationMethods} from "./arithmetics/arithmetics.gen";
import MathX from "../math/MathX/MathX";
import ExerciseBuilder from "./ExerciseBuilder";
import TriangleComponent from "./@component/Triangle.component";
import Vector2 from "../math/Vector2";
import { randomTriangleLength, vectorsFromPoints } from "./geometry/triangle/triangles";
import Circle from "../math/Circle";

export interface Triangle {
    points: { x: number, y: number, label?: string }[]
    vectors: Vector2[],
    AB: number;
    BC: number;
    AC: number;
    knowSide: number[];
}

export const pythagore = () => {
    const AB = MathX.random(2, 20);
    const angleA = MathX.random(35, 65);
    const tan = Math.tan(angleA * Math.PI / 180);
    const BC = Math.floor(tan * AB);
    const AC = Math.hypot(AB, BC);


    const points = [
        {x: 0, y: 0, label: 'A'},
        {x: 0, y: AB, label: 'B'},
        {x: BC, y: AB, label: 'C'}
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

    const expression = `Soit ABC un triangle rectangle en B. AB=${AB} et BC=${BC}. Calculer AC`
    const triangleProps = {
        triangle: {
            points,
            vectors,
            AB,
            BC,
            AC,
            knowSide: [0, 1]
        }
    }

    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addCustomQuestion(TriangleComponent, triangleProps)
        .addCustomAnswer(TriangleComponent, triangleProps)
        .addAnswerLatex(steps[steps.length - 1])
        .addStepAnswerLatex(...steps)
        .toJSON()
};



export const triangleExercice = () => {
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

    const ABsquare = Math.pow(AB, 2);
    const BCSquare = Math.pow(BC, 2);
    const result = Math.sqrt(ABsquare + BCSquare);


    const expression = `Soit ABC un triangle rectangle en B. AB=${AB} et BC=${BC}. Calculer AC`

    const triangleProps = {
        triangle: {
            points,
            vectors,
            AB,
            BC,
            AC,
            knowSide: [0, 1]
        }
    }

    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addCustomQuestion(TriangleComponent, triangleProps)
        .addCustomAnswer(TriangleComponent, triangleProps)
        .addStepAnswerLatex("test")
        .toJSON()
};