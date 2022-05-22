import MathX from "../../math/MathX/MathX";
import ExerciseBuilder from "../ExerciseBuilder";
import MathString from "../MathString";

/**
 * 7(x + 3) =
 * 7 * x + 7 * 3 =
 * 7x + 21
 */

export const factorisation1 = () => {
    const a = MathX.random(-10, 10, [0, 1]);
    const k = MathX.random(-10, 10, [0, 1, a]);

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
 * 7(x - 5) =
 * 7 * 2x - 7 * 5 =
 * 14x - 35
 */
