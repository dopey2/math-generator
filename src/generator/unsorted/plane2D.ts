import MathX from "../../math/MathX/MathX";
import ExerciseBuilder from "../ExerciseBuilder";
import GraphsComponent from "../@component/Graph/Graphs.component";
import Tex from "../../math/Tex";
import Line from "../../math/Line/Line";


export const placePointsOnAPlane = () => {
    const [x1, y1] = MathX.randomValues(2, -5, 5);
    const x2 = MathX.random(-5, 5, [x1]);
    const y2 = MathX.random(-5, 5, [y1]);
    const x3 = MathX.random(-5, 5, [x1, x2]);
    const y3 = MathX.random(-5, 5, [y1, y2]);


    const expression = 'Placer les points suivants sur le repère orthonormée';
    const pointA = `A = (${x1}, ${y1})`;
    const pointB = `B = (${x2}, ${y2})`;
    const pointC = `C = (${x3}, ${y3})`;

    const points = [
        { x: x1, y: y1, label: "A" },
        { x: x2, y: y2, label: "B" },
        { x: x3, y: y3, label: "C" }
    ];

    return new ExerciseBuilder()
        .addQuestionLatex(Tex.toMultilineLatex([expression, pointA, pointB, pointC]))
        .addCustomQuestion(GraphsComponent, {})
        .inlineAnswer()
        .addAnswerLatex(Tex.toMultilineLatex([expression, pointA, pointB, pointC]))
        .addCustomAnswer(GraphsComponent, { points })
        .toJSON();
};


export const readYValuesFromAGraph = () => {
    const x1 = MathX.random(-9, -5);
    const x2 = MathX.random(-4, 0);
    const x3 = MathX.random(1, 5);
    const x4 = MathX.random(6, 9);

    const randomFunction = generateFunction();
    const y1 = randomFunction(x1);
    const y2 = randomFunction(x2);
    const y3 = randomFunction(x3);
    const y4 = randomFunction(x4);


    const expression = 'Placer les points suivants sur le repère orthonormée';

    return new ExerciseBuilder()
        .addQuestionLatex(Tex.toMultilineLatex([expression]))
        .addCustomQuestion(GraphsComponent, { functions: [randomFunction]})
        .inlineAnswer()
        .toJSON();
};


const generateFunction = () => {
    const n = MathX.random(3, 19);

    const xArray: number[] = [];
    const yArray: number[] = [];

    let step = 20 / n + 1;

    let x = -10;
    let y = 0;

    for(let i = 0; i <= n; i++) {
        let minValue = y - 5;
        let maxValue = y + 5;

        y = MathX.random(minValue, maxValue, [y]);
        if(y < -9) {
            y %= -9;
        }
        if(y > 9) {
            y %= 9;
        }

        xArray.push(x);
        yArray.push(y);

        x += step;
    }

    const lines: {x1: number, y1: number, x2: number, y2: number}[] = [];

    const lineFunctions: Line[] = [];

    for(let i = 1; i < xArray.length; i++) {
        lines.push({
            x1: xArray[i - 1],
            y1: yArray[i - 1],
            x2: xArray[i],
            y2: yArray[i],
        });

        lineFunctions.push(new Line(
            xArray[i - 1],
            yArray[i - 1],
            xArray[i],
            yArray[i]
        ));
    }

    return (x: number) => {
        let index = 0;

        for(let i = 0; i < lines.length; i++) {
            if(x >= lines[i].x1) {
                index = i;
            }
        }

        const funct = lineFunctions[index];
        return funct.getY(x);
    };
};

// @ts-ignore
window.test = generateFunction();
