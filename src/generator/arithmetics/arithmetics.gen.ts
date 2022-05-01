import ExerciseBuilder from "../ExerciseBuilder";
import MathX from "../../math/MathX/MathX";
import { evaluate, parse } from "@math-x-ts/parser";

export const addition = (
    terms: number,
    maxNumber: number
) => {
    const operands = MathX.randomValues(terms, 1, maxNumber);
    const expression = operands.join(` + `);
    const value = evaluate(expression);
    return new ExerciseBuilder()
        .addQuestionLatex(expression)
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
        .addAnswerLatex(`${expression} = ${quotient}`)
        .toJSON();
};

export const radical = (maxNumber: number) => {
    const x = MathX.random(1, maxNumber);
    const expression = `\\sqrt{${Math.pow(x, 2)}}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(`${expression} = ${x}`)
        .toJSON();
};

export const fractionRulesExpression = () => {

    const fracA_num = MathX.random(1, 10);
    const fracA_den = MathX.random(1, 10);

    const fracB_num = MathX.random(1, 10);
    const fracB_den = MathX.random(1, 10);

    const fracC_num = MathX.random(1, 10);
    const fracC_den = MathX.random(1, 10);

    const operator1 = MathX.random(0, 1) ? '*' : ':';
    const operator2 = MathX.random(0, 1) ? '+' : '-';

    const expression = `{${fracA_num}} / {${fracA_den}} ${operator1} {${fracB_num}} / {${fracB_den}} ${operator2} {${fracC_num}} / {${fracC_den}}`;
    const mathNode = parse(expression);

    const response = mathNode.solve().toTex();
    const steps = mathNode.solveAllToTex();

    return new ExerciseBuilder()
        .addQuestionLatex(mathNode.toTex())
        .addAnswerLatex(response)
        .addStepAnswerLatex(...steps)
        .toJSON();
};

export const xBaseExponentMultiplication = () => {
    const [expo1, expo2] = MathX.randomValues(2, 1, 10);

    const steps = [
        `x^{${expo1}} * x^{${expo2}} =`,
        `x^{${expo1} + ${expo2}} = `,
        `x^{${expo1 + expo2}}`
    ];


    return new ExerciseBuilder()
        .addQuestionLatex(steps[0])
        .addAnswerLatex(`${steps[0]} ${steps[steps.length - 1]}`)
        .addStepAnswerLatex(...steps)
        .toJSON();
};

export const xBaseExponentDivision = () => {
    const operands = MathX.randomValues(2, 1, 10);
    const min = Math.min(...operands);
    const max = Math.max(...operands);


    const expression = `\\frac{x^{${max}}}{x^{${min}}} =`;
    const step1 = `x^{${max} - ${min}} = `;
    let step2 = `x^{${max - min}}`;
    let step3 = ``;

    if (max - min === 0) {
        step3 = '1';
        step2 += ' =';
    }

    if (max - min === 1) {
        step3 = 'x';
        step2 += ' =';
    }

    let answer = step3 ? step3 : step2;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(`${expression} ${answer}`)
        .addStepAnswerLatex(expression, step1, step2, step3)
        .toJSON();
};

export const xBaseExponent = () => {
    const [a, b, c, d] = MathX.randomValues(4, 2, 10);
    const ab = a + b;
    const cd = c + d;

    const expression = `\\frac{x^{${a}} * x^{${b}}}{x^{${c}} * x^{${d}}} =`;
    const step1 = `\\frac{x^{${a} + ${b}}}{x^{${c} + ${d}}} =`;
    const step2 = `\\frac{x^{${ab}}}{x^{${cd}}} =`;
    let step3 = `x^{${ab} - ${cd}} =`;
    let step4 = `x^{${ab - cd}} `;
    let step5 = ``;

    if (ab - cd === 0) {
        step5 = '1';
        step4 += ' =';
    }

    if (ab - cd === 1) {
        step5 = 'x';
        step4 += ' =';
    }

    let answer = step5 ? step5 : step4;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(`${expression} ${answer}`)
        .addStepAnswerLatex(expression, step1, step2, step3, step4, step5)
        .toJSON();
};
