import ExerciseBuilder from "../ExerciseBuilder";
import MathX from "../../math/MathX/MathX";
import { evaluate } from "@math-x-ts/parser";

export const addition = (
    terms: number,
    maxNumber: number
) => {
    const operands = MathX.randomValues(terms, 1, maxNumber);
    const expression = operands.join(` + `);
    const value = evaluate(expression);
    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .inlineAnswer()
        .addAnswerLatex(`${expression} = ${value}`)
        .toJSON();
};

export const multiplication = (args: {
    terms: number,
    maxNumber: number
    minNumber?: number,
}) => {
    const { terms, minNumber, maxNumber } = args;
    const operands = MathX.randomValues(terms, minNumber ?? 1, maxNumber);
    const expression = operands.join(` * `);

    const value = evaluate(expression);

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .inlineAnswer()
        .addAnswerLatex(`${expression} = ${value}`)
        .toJSON();
};

export const division = (args: {
    minNumber?: number,
    maxNumber: number
}) => {
    const { minNumber, maxNumber } = args;
    const [divisor, quotient] = MathX.randomValues(2, minNumber ?? 1, maxNumber);
    const dividend = divisor * quotient;
    const expression = `${dividend}/${divisor}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .inlineAnswer()
        .addAnswerLatex(`${expression} = ${quotient}`)
        .toJSON();
};

export const radical = (maxNumber: number) => {
    const x = MathX.random(1, maxNumber);
    const expression = `\\sqrt{${Math.pow(x, 2)}}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .inlineAnswer()
        .addAnswerLatex(`${expression} = ${x}`)
        .toJSON();
};

