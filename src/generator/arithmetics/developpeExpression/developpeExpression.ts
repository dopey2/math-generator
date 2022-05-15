import ExerciseBuilder from "../../ExerciseBuilder";
import MathX from "../../../math/MathX/MathX";
import { parse } from "@math-x-ts/parser";

const withSigne = (x: number) => {
    return x >= 0 ? `+ ${x}` : `- ${Math.abs(x)}`;
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

    const steps = mathNode.solveAllToTex();
    const response = `${mathNode.toTex()} = ${mathNode.solve().toTex()}`;

    const finalSteps = steps.map((step: string, i: number) => {
        return i < steps.length - 1 ? step.concat(" =") : step;
    });

    return new ExerciseBuilder()
        .addQuestionLatex(mathNode.toTex())
        .inlineAnswer()
        .addAnswerLatex(response)
        .addStepAnswerLatex(...finalSteps)
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
        .inlineAnswer()
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
        .inlineAnswer()
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
        .inlineAnswer()
        .addAnswerLatex(`${expression} ${answer}`)
        .addStepAnswerLatex(expression, step1, step2, step3, step4, step5)
        .toJSON();
};

// https://fr.wikipedia.org/wiki/Formule_du_bin%C3%B4me_de_Newton
