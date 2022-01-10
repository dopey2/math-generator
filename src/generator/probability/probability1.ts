import MathX from "../../math/MathX/MathX";
import ExerciseBuilder from "../ExerciseBuilder";


export const probabilityWithIntersection = () => {
    const randomA = MathX.random(1, 8) * 10;
    const randomB = MathX.random(1, 8) * 10;
    const randomC = MathX.random(1, 4) * 10;

    const expression = `Dans un groupe de personnes ${randomA}\\% sont des filles; ${randomB}\\% ont les yeux verts; ${randomC}\\% sont des filles et ont les yeux verts. Quelle est la probabilité qu'une personne tirée au sort soit une fille ou qu'elle ait les yeux verts ?`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(expression)
        .addStepAnswerLatex(expression)
        .toJSON();
};