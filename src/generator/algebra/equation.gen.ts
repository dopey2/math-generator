import ExerciseBuilder from "../ExerciseBuilder";
import Point2D from "../../math/Point2D";
import MathX from "../../math/MathX/MathX";
import Tex from "../../math/Tex";
import { parse } from "../../math/Operation/parser";
import MathString from "../MathString";


/** aX + k = y  */
export const equation1 = () => {
    let [a, x, k] = MathX.randomValues(3, -10, 10, [0]);

    const res = a * x + k;
    const expression = `${a}x ${MathString.withSigne(k)} = ${res}`;

    const res1 = res - k;
    const step1 = `${a}x ${MathString.withSigne(k)} \\textcolor{red}{${MathString.inverseSigne(k)}} = ${res} \\textcolor{red}{${MathString.inverseSigne(k)}}`;
    const step2 = `${a}x = ${res1}`;
    const step3Left = `\\frac{${MathString.withNegativeSigne(a)}x}{\\color{red}{${MathString.withNegativeSigne(a)}}}`;
    const step3Right = `\\frac{${MathString.withNegativeSigne(res1)}}{\\color{red}{${MathString.withNegativeSigne(a)}}}`;
    const step3 = `${step3Left} = ${step3Right}`;
    const res3 = res1 / a;
    const step4 = `\\boxed{x = ${res3}}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(step4)
        .addStepAnswerLatex(step1, step2, step3, step4)
        .toJSON();
};

/** aX + j = bX + k */
export const equation2 = () => {
    let x = MathX.random(-10, 10, [0]);
    let a = MathX.random(-10, 10, [0]);
    let b = MathX.random(-10, 10, [a, 0]);

    const xa = x * a;
    const xb = x * b;

    const diff = xa - xb;

    let j = MathX.random(-10, 10);
    let k = j;

    if (diff < 0) {
        if (MathX.random(0, 1)) {
            j += diff;
        } else {
            k -= diff;
        }
    } else {
        if (MathX.random(0, 1)) {
            j -= diff;
        } else {
            k += diff;
        }
    }

    const expression = `${a}x ${MathString.withSigne(j)} = ${b}x ${MathString.withSigne(k)}`;
    const step1 = `${a}x \\textcolor{red}{${MathString.inverseSigne(b)}x} ${MathString.withSigne(j)} = ${b}x \\textcolor{red}{${MathString.inverseSigne(b)}x} ${MathString.withSigne(k)}`;
    const a2 = b > 0 ? a - b : a + Math.abs(b);
    const step2 = `${a2}x ${MathString.withSigne(j)} = ${MathString.withSigne(k)}`;
    const step3 = `${a2}x ${MathString.withSigne(j)} \\textcolor{red}{${MathString.inverseSigne(j)}} = ${MathString.withSigne(k)} \\textcolor{red}{${MathString.inverseSigne(j)}}`;
    const k4 = j > 0 ? k - j : k + Math.abs(j);
    const step4 = `${a2}x = ${MathString.withSigne(k4)}`;

    const step5Left = `\\frac{${MathString.withNegativeSigne(a2)}x}{\\textcolor{red}{${MathString.withNegativeSigne(a2)}}}`;
    const step5Right = `\\frac{${MathString.withNegativeSigne(k4)}}{\\textcolor{red}{${MathString.withNegativeSigne(a2)}}}`;
    const step5 = `${step5Left} = ${step5Right}`;
    const step6 = `\\boxed{x = ${MathString.withNegativeSigne(k4 / a2)}}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(step6)
        .addStepAnswerLatex(step1, step2, step3, step4, step5, step6)
        .toJSON();
};


/**
 * a(x + b) = y
 */
export const equation3 = () => {
    const a = MathX.random(-10, 10, [0, 1]);
    const [x, b] = MathX.randomValues(3, -10, 10, [0]);
    const res = (a * x) + (a * b);

    const ab = a * b;

    const expression = `${MathString.withNegativeSigne(a)}(x ${MathString.withSigne(b)}) = ${res}`;
    const step1 = `${MathString.withNegativeSigne(a)}x ${MathString.withSigne(ab)} = ${res}`;
    const step2 = `${MathString.withNegativeSigne(a)}x ${MathString.withSigne(ab)} ${Tex.color('red', MathString.inverseSigne(ab))} = ${res} ${Tex.color('red', MathString.inverseSigne(ab))}`;
    const res3 = res - ab;
    const step3 = `${MathString.withNegativeSigne(a)}x = ${res3}`;
    const step4 = `\\frac{${MathString.withNegativeSigne(a)}x}{\\textcolor{red}{${MathString.withNegativeSigne(a)}}} = \\frac{${res3}}{\\textcolor{red}{${MathString.withNegativeSigne(a)}}}`;
    const step5 = `\\boxed{x = ${res3 / a}}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(step5)
        .addStepAnswerLatex(step1, step2, step3, step4, step5)
        .toJSON();
};


/**
 * (x / a) + b = y
 */
export const equation4 = () => {
    const [a, b] = MathX.randomValues(2, -10, 10, [0, 1]);
    const xMultiplier = MathX.random(-10, 10, [0, 1]);
    const x = a * xMultiplier;

    const res = (x / a) + b;

    const expression = `\\frac{x}{${a}} ${MathString.withSigne(b)} = ${res}`;
    const step1 = `\\frac{x}{${a}} ${MathString.withSigne(b)} \\textcolor{red}{${MathString.inverseSigne(b)}} = ${res} \\textcolor{red}{${MathString.inverseSigne(b)}}`;
    const res2 = res - b;
    const step2 = `\\frac{x}{${a}} = ${res2}`;
    const aStep3 = a < 0 ? `(${a})` : a;
    const step3 = `\\frac{x}{${a}} \\textcolor{red}{ * ${aStep3}} = ${res2} \\textcolor{red}{ * ${aStep3}}`;
    const res4 = res2 * a;
    const step4 = `\\boxed{x = ${res4}}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(step4)
        .addStepAnswerLatex(step1, step2, step3, step4)
        .toJSON();
};

/**
 * ( x + b) / a = y
 */
export const equation5 = () => {
    const [a, xMultiplier, b] = MathX.randomValues(3, -10, 10, [0, 1]);
    const top = a * xMultiplier;
    const x = top - b;
    const res = (x + b) / a;

    const expression = `\\frac{x ${MathString.withSigne(b)}}{${a}} = ${res}`;
    const a2 = a < 0 ? `(${a})` : a;
    const step1 = `\\frac{x ${MathString.withSigne(b)}}{${a}} \\textcolor{red}{ * ${a2}} = ${res} \\textcolor{red}{ * ${a2}}`;
    const res2 = res * a;
    const step2 = `x ${MathString.withSigne(b)} = ${res2}`;
    const step3 = `x ${MathString.withSigne(b)} \\textcolor{red}{${MathString.inverseSigne(b)}} = ${res2} \\textcolor{red}{${MathString.inverseSigne(b)}}`;
    const res4 = res2 - b;
    const step4 = `\\boxed{x = ${res4}}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(step4)
        .addStepAnswerLatex(step1, step2, step3, step4)
        .toJSON();
};

/**
 * a / x = y
 */

export const equation6 = () => {
    const [x, xMultiplier] = MathX.randomValues(2, -10, 10, [0, 1]);
    const a = x * xMultiplier;

    const res = a / x;
    const expression = `${res} = \\frac{${a}}{x}`;
    const step1 = `${res} \\textcolor{red}{* x} = \\frac{${a}}{x} \\textcolor{red}{* x}`;
    const step2 = `${res}x = ${a}`;
    const res3 = a / res;
    const step3 = `\\frac{${res}x}{\\textcolor{red}{${res}}} = \\frac{${a}}{\\textcolor{red}{${res}}}`;
    const step4 = `\\boxed{x = ${res3}}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(step4)
        .addStepAnswerLatex(step1, step2, step3, step4)
        .toJSON();
};

/**
 * sqrt(x + b) = y
 */
export const equation7 = () => {
    const [a, b] = MathX.randomValues(2, -10, 10, [0, 1]);
    const square = a * a;
    const x = square - b;

    const res = Math.sqrt(x + b);


    const expression = `\\sqrt{x ${MathString.withSigne(b)}} = ${res}`;
    const step1 = `\\sqrt{x ${MathString.withSigne(b)}}^{\\textcolor{red}{2}} = ${res}^{\\textcolor{red}{2}}`;
    const res2 = res * res;
    const step2 = `x ${MathString.withSigne(b)} = ${res2}`;
    const step3 = `x ${MathString.withSigne(b)} \\textcolor{red}{${MathString.inverseSigne(b)}} = ${res2} \\textcolor{red}{${MathString.inverseSigne(b)}}`;
    const res4 = res2 - b;
    const step4 = `\\boxed{x = ${res4}}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(step4)
        .addStepAnswerLatex(step1, step2, step3, step4)
        .toJSON();

};

export const lineEquationFromPoints = () => {
    const [xa, ya] = MathX.randomValues(2, -10, 10);
    const x2Step = MathX.random(1, 10);
    const xb = xa + x2Step;
    const yb = MathX.random(-10, 10, [ya]);

    const pA = new Point2D(xa, ya);
    const pB = new Point2D(xb, yb);

    const expression = [
        `Soit D la droite passant par les points A(${pA.x}; ${pA.y}) et B(${pB.x}; ${pB.y})`,
        `Trouver l'??quation de la forme y = mx + b`
    ];

    const m = parse(`{${pB.y} - ${pA.y}}/{${pB.x} - ${pA.x}}`);
    const mFormula = `m = \\frac{y_b - y_a}{x_b - x_a}`;

    const mSolved = m.solve();
    const mStepsLatex = [`m = ${m.toTex()}`, `m = ${mSolved.toTex()}`];

    const mx = parse(`${pA.x} * ${mSolved}`);
    const mxSolved = mx.solve();

    const mxStepsLatex = [`${pA.y} = ${mx.toTex()} + b`, `${pA.y} = ${mxSolved.toTex()} + b`];

    const b = parse(`${pA.y} - ${mxSolved}`);
    const bSolved = b.solve();

    const bStepsLatex = [`${b.toTex()} = b`, `b = ${bSolved.toTex()}`];
    const yEquation = `\\boxed{y = ${mSolved.toTex()}x + ${bSolved.toTex({ constant: { showNegativeInParenthesis: true } })}}`;

    return new ExerciseBuilder()
        .addQuestionLatex(...expression)
        .addAnswerLatex(yEquation)
        .addStepAnswerLatex(...[mFormula, ...mStepsLatex, ...mxStepsLatex, ...bStepsLatex, yEquation])
        .toJSON();
};


/** aX?? + bX + c = 0  */
export const quadraticEquation1 = () => {
    let [a, x, k] = MathX.randomValues(3, -10, 10, [0]);

    const res = a * x + k;
    const expression = `${a}x ${MathString.withSigne(k)} = ${res}`;

    const res1 = res - k;
    const step1 = `${a}x ${MathString.withSigne(k)} \\textcolor{red}{${MathString.inverseSigne(k)}} = ${res} \\textcolor{red}{${MathString.inverseSigne(k)}}`;
    const step2 = `${a}x = ${res1}`;
    const step3Left = `\\frac{${MathString.withNegativeSigne(a)}x}{\\color{red}{${MathString.withNegativeSigne(a)}}}`;
    const step3Right = `\\frac{${MathString.withNegativeSigne(res1)}}{\\color{red}{${MathString.withNegativeSigne(a)}}}`;
    const step3 = `${step3Left} = ${step3Right}`;
    const res3 = res1 / a;
    const step4 = `\\boxed{x = ${res3}}`;

    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(step4)
        .addStepAnswerLatex(step1, step2, step3, step4)
        .toJSON();
};
