import MathX from "../../math/MathX/MathX";
import ExerciseBuilder from "../ExerciseBuilder";
import Tex from "../../math/Tex";


const showSigne = (x: number) => `${x > 0 ? "+" : "-"}${Math.abs(x)}`;

/**
 * aX + bY = e
 * cX + dY = f
 */

export const systemWith2Unknown = () => {
    const [x, y, a, b, c, d] = MathX.randomValues(6, -10, 10, [0]);

    const expression = Tex.toMultilineLatex([
        `${a}x ${showSigne(b)}y = ${a * x + b * y}`,
        `${c}x ${showSigne(d)}y = ${c * x + d * y}`
    ]);


    const lcmAB = MathX.lcm(a, b);
    const aa = lcmAB / a;
    const bb = lcmAB / b;


    const step1 = '2x';
    const step4 = 'blabla';


    return new ExerciseBuilder()
        .addQuestionLatex(expression)
        .addAnswerLatex(expression, step4)
        .addStepAnswerLatex(expression, step1, step4)
        .toJSON();
};
