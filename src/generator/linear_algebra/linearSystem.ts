import MathX from "../../math/MathX/MathX";
import ExerciseBuilder from "../ExerciseBuilder";
import Tex from "../../math/Tex";


const showSigne = (x: number, hide1?: boolean) => {
    const signe = x > 0 ? "+" : "-";

    if(hide1 && Math.abs(x) === 1) {
        return signe;
    }

    return `${signe}${Math.abs(x)}`;
};

const showNegativeOnly = (x: number, hide1?: boolean) => {
    const signe = x > 0 ? "" : "-";

    if(hide1 && Math.abs(x) === 1) {
        return signe;
    }

    return `${signe}${Math.abs(x)}`;
};

/**
 * aX + bY = e
 * cX + dY = f
 */

export const systemWith2UnknownBySubstitution = () => {
    const d = MathX.random(-5, 5, [0]);
    const cMultiple = MathX.random(-5, 5, [0]);
    const c = d * cMultiple;

    const [x, a, b] = MathX.randomValues(3, -10, 10, [0]);
    const y = MathX.random(-10, 10, [0, x]);

    const res1 = a * x + b * y;
    const res2 = c * x + d * y;

    // c && res2 => multiple of d


    const expression = Tex.toMultilineLatex([
        `${showNegativeOnly(a, true)}x ${showSigne(b, true)}y = ${res1}`,
        `${showNegativeOnly(c, true)}x ${showSigne(d, true)}y = ${res2}`
    ]);


    let res2Step1 = res2;
    let cStep1 = -c;

    const steps1 = [
        `${showNegativeOnly(d, true)}y = ${res2Step1} ${showSigne(cStep1, true)}x`
    ];

    if(d === -1) {
        res2Step1 = -res2Step1;
        cStep1 = -cStep1;
        steps1.push(`${showNegativeOnly(d, true)}y = ${res2Step1} ${showSigne(cStep1, true)}x`);
    } else if(d !== 1) {
        const yPart = `\\frac{${showNegativeOnly(d)}y}{${showNegativeOnly(d)}}`;
        const resPart = `\\frac{${showNegativeOnly(res2Step1)} ${showSigne(cStep1)}x}{${showNegativeOnly(d)}}`;
        steps1.push(`${yPart} = ${resPart}`);

        res2Step1 /= d;
        cStep1 /= d;
        steps1.push(`y = ${res2Step1} ${showSigne(cStep1, true)}x`);
    }


    const addX = a + b * cStep1;
    const bResStep2 = b * res2Step1;
    const resStep2 = res1 - bResStep2;
    const xRes = resStep2 / addX;

    const xSteps = [
        `${showNegativeOnly(a, true)}x ${showSigne(b)}(${res2Step1} ${showSigne(cStep1, true)}x) = ${res1}`,
        `${showNegativeOnly(a, true)}x ${showSigne(bResStep2)} ${showSigne(b * cStep1, true)}x = ${res1}`,
        `${showNegativeOnly(addX, true)}x ${showSigne(bResStep2)} = ${res1}`,
        `${showNegativeOnly(addX, true)}x = ${res1} ${showSigne(-bResStep2)}`,
        `${showNegativeOnly(addX, true)}x = ${resStep2}`,
        `x = \\frac{${resStep2}}{${showNegativeOnly(addX)}}`,
        `x = ${xRes}`
    ];

    const cXRes = cStep1 * xRes;
    const yRes = cStep1 * xRes;

    const ySteps = [
        `y = ${res2Step1} ${showSigne(cStep1, true)}(${xRes})`,
        `y = ${res2Step1} ${showSigne(cXRes, true)}`,
        `y = ${yRes}`
    ];

    const answer = `
x = ${xRes}
y = ${yRes};
    `;


    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(answer)
        .addStepAnswerLatex(Tex.toMultilineLatex(steps1))
        .addStepAnswerLatex(Tex.toMultilineLatex(xSteps))
        .addStepAnswerLatex(Tex.toMultilineLatex(ySteps))
        .toJSON();
};


export const systemWith2UnknownByLinearCombination = () => {
    const [x, y, a, b, c, d] = MathX.randomValues(6, -10, 10, [0]);

    const expression = Tex.toMultilineLatex([
        `${a}x ${showSigne(b)}y = ${a * x + b * y}`,
        `${c}x ${showSigne(d)}y = ${c * x + d * y}`
    ]);

    const steps = ["x = 3"];
    const lcmAB = MathX.lcm(a, b);


    const step1 = '2x';
    const step4 = 'blabla';


    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(expression, step4)
        .addStepAnswerLatex(steps)
        .toJSON();
};
