import MathX from "../../math/MathX/MathX";
import ExerciseBuilder from "../ExerciseBuilder";
import GraphsComponent from "../@component/Graph/Graphs.component";
import Tex from "../../math/Tex";


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
