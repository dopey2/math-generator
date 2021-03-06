import ExerciseBuilder from "../ExerciseBuilder";
import MathX from "../../math/MathX/MathX";
import GraphsComponent from "../@component/Graph/Graphs.component";
import Tex from "../../math/Tex";


export const vectors1 = () => {
    const [x1, y1] = MathX.randomValues(2, -5, 5, [0, 1]);
    const x2 = MathX.random(-5, 5, [0, 1, x1]);
    const y2 = MathX.random(-5, 5, [0, 1, y1]);
    const x3 = MathX.random(-5, 5, [0, 1, x1, x2]);
    const y3 = MathX.random(-5, 5, [0, 1, y1, y2]);


    const expression = 'Déterminer graphiquement les coordonnées des vecteurs';

    const vectors = [
        { x: x1, y: y1, label: 'u', color: 'blue' },
        { x: x2, y: y2, label: 'v', color: 'green' },
        { x: x3, y: y3, label: 'w', color: 'red' }
    ];

    const answer = Tex.toMultilineLatex([
        `\\overrightarrow{u} = (${x1}; ${y1})`,
        `\\overrightarrow{v} = (${x2}; ${y2})`,
        `\\overrightarrow{w} = (${x3}; ${y3})`
    ]);

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addCustomQuestion(GraphsComponent, { vectors })
        .addAnswerLatex(answer)
        .toJSON();
};


export const vectors2 = () => {
    const [x1, y1] = MathX.randomValues(2, -5, 5, [0, 1]);
    const x2 = MathX.random(-5, 5, [0, 1, x1]);
    const y2 = MathX.random(-5, 5, [0, 1, y1]);
    const x3 = MathX.random(-5, 5, [0, 1, x1, x2]);
    const y3 = MathX.random(-5, 5, [0, 1, y1, y2]);


    const expression = Tex.toMultilineLatex([
        `Construire les vecteurs sur le graph à partir des coordonnées ci-dessous:`,
        `\\overrightarrow{u} = (${x1}; ${y1})`,
        `\\overrightarrow{v} = (${x2}; ${y2})`,
        `\\overrightarrow{w} = (${x3}; ${y3})`
    ]);

    const vectors = [
        { x: x1, y: y1, label: 'u', color: 'blue' },
        { x: x2, y: y2, label: 'v', color: 'green' },
        { x: x3, y: y3, label: 'w', color: 'red' }
    ];

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addCustomQuestion(GraphsComponent, {})
        .inlineAnswer()
        .addAnswerLatex(expression)
        .addCustomAnswer(GraphsComponent, { vectors })
        .toJSON();
};


export const vectors3 = () => {
    const [x1, y1] = MathX.randomValues(2, -5, 5, [0, 1]);
    const x2 = MathX.random(-5, 5, [0, 1, x1]);
    const y2 = MathX.random(-5, 5, [0, 1, y1]);

    const x3 = x1 + x2;
    const y3 = y1 + y2;

    const expression = Tex.toMultilineLatex([
        `Construire les vecteurs sur le graph à partir des coordonnées ci-dessous:`,
        `\\overrightarrow{u} = (${x1}; ${y1})`,
        `\\overrightarrow{v} = (${x2}; ${y2})`,
        `\\overrightarrow{w} = \\overrightarrow{u} + \\overrightarrow{v}`
    ]);

    const vectors = [
        { x: x1, y: y1, label: 'u', color: 'blue' },
        { x: x2, y: y2, label: 'v', color: 'green' },
        { x: x3, y: y3, label: 'w', color: 'red' }
    ];

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addCustomQuestion(GraphsComponent, {})
        .inlineAnswer()
        .addAnswerLatex(expression)
        .addCustomAnswer(GraphsComponent, { vectors })
        .toJSON();
};

export const vectorFromUnitVector = () => {
    const vx = MathX.random(-10, 10, [0]);
    const vy = MathX.random(-5, 5, [0, vx]);

    const expression = Tex.toMultilineLatex([
        `Sois le vecteur \\overrightarrow{v} = (${vx}; ${vy})`,
        `Exprimer le vecteur v en fonction des vecteurs unitaire i et j`,
        `i = (1; 0) et j = (0; 1)`
    ]);

    const answer = `\\overrightarrow{v} = ${vx}i + ${vy}j`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(answer)
        .toJSON();
};

/**
 * combinaison linéaire
 * https://www.alloprof.qc.ca/fr/eleves/bv/mathematiques/la-combinaison-lineaire-de-vecteurs-m1305
 */
