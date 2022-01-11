import MathX from "../math/MathX/MathX";
import ExerciseBuilder from "./ExerciseBuilder";
import PolygonComponent from "./@component/Polygon/Polygon.component";
import { randomTriangleLength } from "./geometry/triangle/triangles";
import Triangle from "../math/Geometry/Triangle/Triangle.math";
import Vector2 from "../math/Vector2";
import Square from "../math/Geometry/Square/Square";

export interface TriangleI {
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


    const triangle = Triangle.withSize(AB, BC, AC);
    const polygon = triangle.toPolygon();

    const props = {
        polygon: polygon,
        verticesLabel: [
            { name: "A", show: true },
            { name: "B", show: true },
            { name: "C", show: true }
        ],
        edgesLabel: [
            { name: `${AB}`, show: true },
            { name: `${BC}`, show: true },
            { name: `?`, show: true }
        ],
    };

    const expression = `Soit ABC un triangle rectangle en B. AB=${AB} et BC=${BC}. Calculer AC`;

    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addCustomQuestion(PolygonComponent, props)
        .addCustomAnswer(PolygonComponent, props)
        .addAnswerLatex(steps[steps.length - 1])
        .addStepAnswerLatex(...steps)
        .toJSON();
};

export const triangleExercice = () => {
    const [AB, BC, AC] = randomTriangleLength();
    const triangle = Triangle.withSize(AB, BC, AC);
    const polygon = triangle.toPolygon();

    const expression = `Soit ABC un triangle rectangle en B. AB=${AB} et BC=${BC}. Calculer AC`;

    const props = {
        polygon: polygon,
        verticesLabel: [
            { name: "A", show: true },
            { name: "B", show: true },
            { name: "C", show: true }
        ],
        edgesLabel: [
            { name: `${AB}`, show: true },
            { name: `${BC}`, show: true },
            { name: `${AC}`, show: true }
        ],
    };

    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addCustomQuestion(PolygonComponent, props)
        .addCustomAnswer(PolygonComponent, props)
        .addStepAnswerLatex("test")
        .toJSON();
};

export const getSquareArea = () => {
    const side = MathX.random(2, 10);

    const expression = `Soit le carré ABCD avec AB = ${side}`;
    const square = new Square(side);

    const props = {
        polygon: square.toPolygon(),
        verticesLabel: [
            { name: "A", show: true },
            { name: "B", show: true },
            { name: "C", show: true },
            { name: "D", show: true }
        ],
        edgesLabel: [
            { name: `${side}`, show: true },
            { name: `${side}`, show: true },
            { name: `${side}`, show: true },
            { name: `${side}`, show: true }
        ],
    };

    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addCustomQuestion(PolygonComponent, props)
        .addCustomAnswer(PolygonComponent, props)
        .addAnswerHtml(square.getArea())
        .toJSON();
};