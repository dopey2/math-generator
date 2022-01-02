import MathX from "../../../math/MathX";
import ExerciseBuilder from "../../ExerciseBuilder";
import { toMultilineLatex } from "../../utils";
import Constant from "../../../math/Operation/Constant/Constant";


/**
 * aX + bY = e
 * cX + dY = f
 */

export const systemWith2Unknown = () => {
  const [x, y, a, b, c, d] = MathX.randomValues(6, -10, 10, [0]);

  const expression = toMultilineLatex([
    `${a}x ${new Constant(b).toTex({ constant: { showSign: true } })}y = ${a * x + b * y}`,
    `${c}x ${new Constant(d).toTex({ constant: { showSign: true } })}y = ${c * x + d * y}`
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