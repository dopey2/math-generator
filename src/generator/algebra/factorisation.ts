import MathX from "../../math/MathX/MathX";
import ExerciseBuilder from "../ExerciseBuilder";
import MathString from "../MathString";

/**
 * 7(x + 3) =
 * 7 * x + 7 * 3 =
 * 7x + 21
 */

export const factorisation1 = () => {
    const a = MathX.random(-10, 10, [0, 1, -1]);
    const k = MathX.random(-10, 10, [0, 1, -1, a]);

    const expression = `${a}x ${MathString.withSigne(a * k)}`;

    const step1 = `${a} * x  ${MathString.withSigne(a)} * ${MathString.negativeSigneParenthesis(k)} =`;
    const step2 = `${a}(x ${MathString.withSigne(k)})`;


    const expressionEqual = `${expression} =`;
    const response2 = step2;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .inlineAnswer()
        .addAnswerLatex(expressionEqual, response2)
        .addStepAnswerLatex(expressionEqual, step1, step2)
        .toJSON();
};

/**
 * x^2 + 2x = x * x + x * 2 = x(x + 2)
 */
export const factorisation2 = () => {
    const k = MathX.random(-10, 10, [0, 1, -1]);

    const expression = `x^{2} ${MathString.withSigne(k)}x`;
    const step1 = `x * x  + x * ${MathString.negativeSigneParenthesis(k)} =`;
    const step2 = `x(x ${MathString.withSigne(k)})`;

    const expressionEqual = `${expression} =`;
    const response2 = step2;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .inlineAnswer()
        .addAnswerLatex(expressionEqual, response2)
        .addStepAnswerLatex(expressionEqual, step1, step2)
        .toJSON();
};

/**
 * 3x^2 - 6x = 3x * x - 3x * 2 = 3x(x - 2)
 * The second constant is a multiple of the first one
 */
export const factorisation3 = () => {
    const k = MathX.random(-10, 10, [0, 1, -1]);

    const expression = `x^{2} ${MathString.withSigne(k)}x`;
    const step1 = `x * x  + x * ${MathString.negativeSigneParenthesis(k)} =`;
    const step2 = `x(x ${MathString.withSigne(k)})`;

    const expressionEqual = `${expression} =`;
    const response2 = step2;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .inlineAnswer()
        .addAnswerLatex(expressionEqual, response2)
        .addStepAnswerLatex(expressionEqual, step1, step2)
        .toJSON();
};

