import ExerciseBuilder from "../ExerciseBuilder";
import MathX from "../../math/MathX";
import GraphsComponent from "../@component/Graphs.component";


export const vectors1 = () => {
    const [x1, y1] = MathX.randomValues(2, -5, 5, [0, 1]);

    const x2 = MathX.random(-5, 5, [0, 1, x1]);
    const y2 = MathX.random(-5, 5, [0, 1, y1]);

    const expression = 'Déterminer graphiquement les coordonnées des vecteurs';


    const vectors = [
        { x: 2, y: 3, label: 'u' },
    ];

    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addCustomQuestion(GraphsComponent, { vectors })
        .addAnswerLatex(expression)
        .addStepAnswerLatex(expression)
        .toJSON();
};