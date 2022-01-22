import MathX from "../../../math/MathX/MathX";
import Triangle from "../../../math/Geometry/Triangle/Triangle.math";
import ExerciseBuilder from "../../ExerciseBuilder";
import PolygonComponent from "../../@component/Polygon/Polygon.component";

export const generateTriangleLength = (minSize = 2, maxSize = 10) => {
    const A = MathX.random(minSize, maxSize);
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

export const generateTriangleAngle = () => {
    let [A, B] = MathX.randomValues(2, 25, 60);
    let C = 180 - (A + B);

    if(C === 90) {
        C -= 5;

        if(A < B) {
            A += 5;
        } else {
            B += 5;
        }
    }

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


    const triangle = Triangle.withSide(AB, BC, AC);
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


export const triangleAAS = () => {
    const [A, B, C] = generateTriangleAngle();
    const side = MathX.random(2, 10);

    const triangle = Triangle.with3AnglesAnd1Side(A, B, C, null, side, null);
    const sides = triangle.sides;

    const polygon = triangle.toPolygon();
    const expression = `Soit le triangle ABC avec \\angle A = ${A}°, \\angle B = ${B}°, et b = ${side}; 
    Calculer l'angle C, le coté a et le côté b`;

    let props: any = {
        polygon,
        verticesLabel: [
            { name: "A", show: true },
            { name: "B", show: true },
            { name: "C", show: true }
        ],
        edgesLabel: [
            { name: `c`, show: true },
            { name: `a`, show: true },
            { name: `${parseFloat(sides[2].toFixed(1))}`, show: true }
        ],
    };

    const stepsCAngle = [
        `C = 180 - (${A} + ${B}) = ${180 - (A + B)}`
    ];

    let bSinB = side / Math.sin(MathX.degToRadian(B));
    bSinB = parseFloat(bSinB.toFixed(2));

    let bSinBSinA = bSinB * Math.sin(MathX.degToRadian(A));
    bSinBSinA = parseFloat(bSinBSinA.toFixed(2));

    let bSinBSinC = bSinB * Math.sin(MathX.degToRadian(C));
    bSinBSinC = parseFloat(bSinBSinC.toFixed(2));

    const stepsSideA = [
        `Nous allons calculer le côté a grace à la loi du sinus`,
        `\\frac{a}{sin A} = \\frac{b}{sin B}`,
        `\\frac{a}{sin ${A}} = \\frac{${side}}{sin ${B}}`,
        `\\frac{a}{sin ${A}} = ${bSinB}`,
        `\\frac{a}{sin ${A}} * sin ${A} = ${bSinB} * {sin ${A}}`,
        `a = ${bSinBSinA}`
    ];

    const stepsSideC = [
        `Nous allons calculer le côté a grace à la loi du sinus`,
        `\\frac{c}{sin C} = \\frac{b}{sin B}`,
        `\\frac{c}{sin ${C}} = \\frac{${side}}{sin ${B}}`,
        `\\frac{c}{sin ${C}} = ${bSinB}`,
        `\\frac{c}{sin ${C}} * sin ${C} = ${bSinB} * {sin ${C}}`,
        `c = ${bSinBSinC}`
    ];

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addCustomQuestion(PolygonComponent, props)
        .addCustomAnswer(PolygonComponent, props)
        .addStepAnswerLatex(...stepsCAngle)
        .addStepAnswerLatex(...stepsSideA)
        .addStepAnswerLatex(...stepsSideC)
        .toJSON();
};

const triangleSSA = () => {
    // TODO https://www.mathsisfun.com/algebra/trig-solving-sas-triangles.html
}

const triangleSSS = () => {
    // TODO https://www.mathsisfun.com/algebra/trig-solving-sss-triangles.html
}