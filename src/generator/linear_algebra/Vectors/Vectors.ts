import ExerciseBuilder from "../../ExerciseBuilder";
import MathX from "../../../math/MathX";
import Graphs from "../../@component/Graphs";


export const vectors1 = () => {
    const [x1, y1] = MathX.randomValues(2, -5, 5, [0, 1]);

    const x2 = MathX.random(-5, 5, [0, 1, x1]);
    const y2 = MathX.random(-5, 5, [0, 1, y1]);

    const expression = 'Déterminer graphiquement les coordonnées des vecteurs';


    const vectors = [
        { x: x1, y: y1, name: 'u' },
        { x: x2, y: y2, name: 'v' }
    ];

    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addCustomQuestion(Graphs, { vectors })
        .addAnswerLatex(expression)
        .addStepAnswerLatex(expression)
        .toJSON();

};