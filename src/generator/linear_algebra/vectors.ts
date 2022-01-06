import ExerciseBuilder from "../ExerciseBuilder";
import MathX from "../../math/MathX/MathX";
import GraphsComponent from "../@component/Graphs.component";
import {toMultilineLatex} from "../utils";


export const vectors1 = () => {
    const [x1, y1] = MathX.randomValues(2, -5, 5, [0, 1]);
    const x2 = MathX.random(-5, 5, [0, 1, x1]);
    const y2 = MathX.random(-5, 5, [0, 1, y1]);
    const x3 = MathX.random(-5, 5, [0, 1, x1, x2]);
    const y3 = MathX.random(-5, 5, [0, 1, y1, y2]);


    const expression = 'Déterminer graphiquement les coordonnées des vecteurs';

    const vectors = [
        { x: x1, y: y1, label: 'u', color: 'blue' },
        { x: x2, y: y2, label: 'v', color: 'green'},
        { x: x3, y: y3, label: 'w', color: 'red' },
    ];

    const answer = toMultilineLatex([
        `\\overrightarrow{u} = (${x1}, ${y1})`,
        `\\overrightarrow{v} = (${x2}, ${y2})`,
        `\\overrightarrow{w} = (${x3}, ${y3})`,
    ])

    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addCustomQuestion(GraphsComponent, { vectors })
        .addAnswerHtml(expression)
        .addCustomAnswer(GraphsComponent, { vectors })
        .addAnswerLatex(answer)
        .toJSON();
};