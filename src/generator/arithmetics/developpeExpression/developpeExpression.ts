import ExerciseBuilder from "../../ExerciseBuilder";
import MathX from "../../../math/MathX";

const withSigne = (x: number) => {
    return x >= 0 ? `+ ${x}` : `- ${Math.abs(x)}`;
};

const withNegativeSigne = (x: number) => {
    return x < 0 ? `- ${Math.abs(x)}` : `${x}`;
};

const inverseSigne = (x: number) => {
    return x > 0 ? `- ${x}` : `+ ${-x}`;
};

export const developpeExpression2 = () => {
    let [a, b, c, d] = MathX.randomValues(4, -10, 10, [0]);
    const expression = `(${a}x ${withSigne(b)})(${c}x ${withSigne(d)})`;

    const ac = a * c;
    const ad = a * d;
    const bc = b * c;
    const bd = b * d;

    const step1 = `${ac}x^2 ${withSigne(ad)}x ${withSigne(bc)}x ${withSigne(bd)}`;
    const step2 = `${ac}x^2 ${withSigne(ad + bc)}x ${withSigne(bd)}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(expression, step2)
        .addStepAnswerLatex(expression, step1, step2)
        .toJSON();
};


export const developExpressionSquareRoot1 = () => {
    const [x, y, z] = MathX.randomValues(3, 2, 7);
    const squareX = Math.pow(x, 2);
    const squareY = Math.pow(y, 2);
    const squareZ = Math.pow(z, 2);

    const max = 10 - Math.max(x, y, z);
    const P = MathX.random(2, max);

    const [kA, kB, kC] = MathX.randomValues(3, 2, 9);


    const expression = `${kA}\\sqrt{${squareX * P}} + ${kB}\\sqrt{${squareY * P}} - ${kC}\\sqrt{${squareZ * P}} =`;
    const step1 = `${kA}\\sqrt{${squareX} * ${P}} + ${kB}\\sqrt{${squareY} * ${P}} - ${kC}\\sqrt{${squareZ} * ${P}} =`;
    const step2 = `${kA * x}\\sqrt{${P}} + ${kB * y}\\sqrt{${P}} - ${kC * z}\\sqrt{${P}} =`;
    const step3 = `${(kA * x) + (kB * y) - (kC * z)}\\sqrt{${P}}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(expression, step3)
        .addStepAnswerLatex(expression, step1, step2, step3)
        .toJSON();
};


// https://fr.wikipedia.org/wiki/Formule_du_bin%C3%B4me_de_Newton