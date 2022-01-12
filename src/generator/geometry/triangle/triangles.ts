import MathX from "../../../math/MathX/MathX";
import Triangle from "../../../math/Geometry/Triangle/Triangle.math";
import ExerciseBuilder from "../../ExerciseBuilder";
import PolygonComponent from "../../@component/Polygon/Polygon.component";

export const randomTriangleLength = () => {
    const A = MathX.random(2, 10);
    let minB = A - 1;
    let maxB = A + 1;

    if (minB < 1) {
        minB += (1 - minB);
        maxB += (1 - maxB);
    }

    const B = MathX.random(minB, maxB);

    const min = Math.min(A, B);
    const max = Math.max(A, B);

    const C = MathX.random((max - min + 1), (A + B - 1));
    return [A, B, C];
};


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