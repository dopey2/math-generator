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
    const b = MathX.random(-3, 3);

    const x1 = -5 + b;
    const x2 = b;
    const x3 = 5 + b;

    const randomFunction = generateFunction(b);

    const y1 = Math.round(randomFunction(x1));
    const y2 = Math.round(randomFunction(x2));
    const y3 = Math.round(randomFunction(x3));

    const expression = `Lire le graph et donner l'image de ${x1}, ${x2} et ${x3} sous la form f(x) = y`;

    const pointA = `f(${x1}) =`;
    const pointB = `f(${x2}) ${x2 < 0 ? '' : ' '}=`;
    const pointC = `f(${x3})  =`;

    const resPointA = `f(${x1}) = ${y1}`;
    const resPointB = `f(${x2}) ${x2 < 0 ? '' : ' '}= ${y2}`;
    const resPointC = `f(${x3})  = ${y3}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addCustomQuestion(GraphsComponent, { functions: [randomFunction] })
        .addQuestionLatex(Tex.toMultilineLatex([pointA, pointB, pointC]))
        .inlineAnswer()
        .addAnswerLatex(expression)
        .addCustomAnswer(GraphsComponent, { functions: [randomFunction] })
        .addAnswerLatex(Tex.toMultilineLatex([resPointA, resPointB, resPointC]))
        .toJSON();
};


const generateFunction = (b: number = 0) => {
    const n = MathX.random(4, 4);

    const xArray: number[] = [];
    const yArray: number[] = [];

    let step = 20;

    for(let i = 0; i < n - 2; i++) {
        step /= 2;
    }

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
            x1: xArray[i - 1] + b,
            y1: yArray[i - 1],
            x2: xArray[i] + b,
            y2: yArray[i],
        });

        lineFunctions.push(new Line(
            xArray[i - 1] + b,
            yArray[i - 1],
            xArray[i] + b,
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
