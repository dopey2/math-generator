import ExerciseBuilder from "../ExerciseBuilder";
import MathX from "../../math/MathX/MathX";
import { parse } from "../../math/Operation/parser";


// TODO REMOVE THIS
type Fraction = {
    dividend: number;
    divisor: number;
    quotient?: number;
}

// TODO REMOVE THIS
type BaseOperator = '+' | '-' | '*' | ':';

// TODO REMOVE THIS
const baseOperation = (term1: number, term2: number, operator: BaseOperator) => {
    switch (operator) {
    case "+":
        return term1 + term2;
    case "-":
        return term1 - term2;
    case "*":
        return term1 * term2;
    case ":":
        return term1 / term2;
    }
};

export const addition = (
    terms: number,
    maxNumber: number
) => {
    const operands = MathX.randomValues(terms, 1, maxNumber);
    const expression = operands.join(` + `);
    const value = parse(expression).solveValue();
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

    const value = parse(expression).solveValue();

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(`${expression} = ${value}`)
        .toJSON();
};
;

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


type FractionOperationWithStep = {
    dividend: number;
    divisor: number;
    latexStep: string[];
}

const solveFractionOperation = (
    fractionA: Fraction,
    fractionB: Fraction,
    operator: BaseOperator
): FractionOperationWithStep => {
    if (operator === '*' || operator === ':') {
        let _fractionB = { ...fractionB };
        if (operator === ':') {
            _fractionB = {
                dividend: fractionB.divisor,
                divisor: fractionB.dividend,
            };
        }

        const step1_dividend = `${fractionA.dividend} * ${_fractionB.dividend}`;
        const step1_divisor = `${fractionA.divisor} * ${_fractionB.divisor}`;
        const dividend = fractionA.dividend * _fractionB.dividend;
        const divisor = fractionA.divisor * _fractionB.divisor;

        return {
            dividend,
            divisor,
            latexStep: [
                `\\frac{${step1_dividend}}{${step1_divisor}}`,
                `\\frac{${dividend}}{${divisor}}`
            ],
        };
    } else {
        if (fractionA.divisor === fractionB.divisor) {
            const dividend = baseOperation(fractionA.dividend, fractionB.dividend, operator);

            return {
                dividend: dividend,
                divisor: fractionA.divisor,
                latexStep: [
                    `\\frac{${fractionA.dividend} ${operator} ${fractionB.dividend}}{${fractionA.divisor}}`,
                    `\\frac{${dividend}}{${fractionA.divisor}}`
                ],
            };
        } else {
            let inverse = fractionA.divisor < fractionB.divisor;
            let _fractionA = { ...(inverse ? fractionB : fractionA) };
            let _fractionB = { ...(inverse ? fractionA : fractionB) };
            const divisionRes = _fractionA.divisor / _fractionB.divisor;

            const steps = [];

            let step1_FractionAResult = { ..._fractionA };
            let step1_FractionBResult = { ..._fractionB };

            /**
             * Transform to same divisor
             */
            if ((divisionRes) - Math.floor(divisionRes) === 0) {
                /**
                 * Case multiply by constant
                 */
                const step1_fractionB_dividend = `${_fractionB.dividend} * ${divisionRes}`;
                const step1_fractionB_divisor = `${_fractionB.divisor} * ${divisionRes}`;

                const arr = [
                    `\\frac{${_fractionA.dividend}}{${_fractionA.divisor}}`,
                    `\\frac{${step1_fractionB_dividend}}{${step1_fractionB_divisor}}`
                ];

                let leftIndex = inverse ? 1 : 0;
                let rightIndex = inverse ? 0 : 1;

                steps.push(`${arr[leftIndex]} ${operator} ${arr[rightIndex]}`);

                step1_FractionBResult.dividend = _fractionB.dividend * divisionRes;
                step1_FractionBResult.divisor = _fractionB.divisor * divisionRes;
            } else {
                /**
                 * multiply by other fraction divisor
                 */
                const step1_fractionA_dividend = `${_fractionA.dividend} * ${_fractionB.divisor}`;
                const step1_fractionA_divisor = `${_fractionA.divisor} * ${_fractionB.divisor}`;

                const step1_fractionB_dividend = `${_fractionB.dividend} * ${_fractionA.divisor}`;
                const step1_fractionB_divisor = `${_fractionB.divisor} * ${_fractionA.divisor}`;

                steps.push(`
                \\frac{${step1_fractionA_dividend}}{${step1_fractionA_divisor}} 
                ${operator}
                \\frac{${step1_fractionB_dividend}}{${step1_fractionB_divisor}}    
                `);

                step1_FractionAResult.dividend = _fractionA.dividend * _fractionB.divisor;
                step1_FractionAResult.divisor = _fractionA.divisor * _fractionB.divisor;
                step1_FractionBResult.dividend = _fractionB.dividend * _fractionA.divisor;
                step1_FractionBResult.divisor = _fractionB.divisor * _fractionA.divisor;
            }

            const finalFractionA = { ...(inverse ? step1_FractionBResult : step1_FractionAResult) };
            const finalFractionB = { ...(inverse ? step1_FractionAResult : step1_FractionBResult) };

            let step2_fractionResult = solveFractionOperation(finalFractionA, finalFractionB, operator);
            step2_fractionResult.latexStep = [
                ...steps,
                ...step2_fractionResult.latexStep
            ];
            return step2_fractionResult;
        }
    }
};


// TODO use math/Operation/Fraction
export const fractionRulesExpression = () => {
    const fractionA = {
        dividend: MathX.random(1, 10),
        divisor: MathX.random(1, 10),
    };

    const fractionB = {
        dividend: MathX.random(1, 10),
        divisor: MathX.random(1, 10),
    };

    const fractionC = {
        dividend: MathX.random(1, 10),
        divisor: MathX.random(1, 10),
    };

    // const expression1 = `${fractionA.dividend}/${fractionA.divisor}`;
    // const expression2 = `${fractionB.dividend}/${fractionB.divisor}`;
    // const expression3 = `${fractionC.dividend}/${fractionC.divisor}`;

    const operator1 = MathX.random(0, 1) ? '*' : ':';
    const operator2 = MathX.random(0, 1) ? '+' : '-';

    const fractionAB = solveFractionOperation(fractionA, fractionB, operator1);
    const fractionABC = solveFractionOperation(fractionAB, fractionC, operator2);

    // const finalExpression = `${expression1} ${operator1} ${expression2} ${operator2} ${expression3}`;
    // const value = 0;

    const steps = [];

    const latex = `\\frac{${fractionA.dividend}}{${fractionA.divisor}} ${operator1} \\frac{${fractionB.dividend}}{${fractionB.divisor}}${operator2} \\frac{${fractionC.dividend}}{${fractionC.divisor}}`;

    steps.push(latex);

    fractionAB.latexStep.forEach((step) => {
        steps.push(`${step} ${operator2} \\frac{${fractionC.dividend}}{${fractionC.divisor}}`);
    });

    fractionABC.latexStep.forEach((step) => {
        steps.push(step);
    });

    return new ExerciseBuilder()
        .addQuestionLatex(latex)
        .addAnswerLatex(`${steps[steps.length - 1]}`)
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