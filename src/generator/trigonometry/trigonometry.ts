/**
 * 1) Deg to radian
 * 2) Radian to deg
 * 3) Polar to cartesian
 * 4) Cartesian to polar
 * 5) Apply Rotation from origin
 * 6) Apply rotation from a custom point
 */

import MathX from "../../math/MathX/MathX";
import ExerciseBuilder from "../ExerciseBuilder";

/**
  Soit P un point d'un repère orthonormé avec les coordonnées polaires (3, -90°)
  Donner les coordonnées cartésiennse de la form (x, y) du point P.

  P = (3, -90°) <=> P = (0, -3)
 P = (3, 90°) <=> P = (0, 3)
 P = (3, 180°) <=> P = (-3, 0)
 P = (3, 270°) <=> P = (0, -3)
 P = (3, 360°) <=> P = (3, 0)

 */


export const degToRadian = () => {
  const deg = 180 // MathX.random(0, 36) * 10;
  const rad = MathX.degToRadian(deg);

  const expression = `Exprimer l'angle ${deg}° en radion.`;

  const steps = [
    `\\pi rad = 180°`,
    `1° = \\frac{\\pi}{180°}`,
    `${deg} * \\frac{\\pi}{180°} <=>`,
    `\\frac{${deg}\\pi}{180°} rad`
  ];

  let step3 = '';

  if(deg === 180) {
    steps[steps.length -1] = `${steps[steps.length -1] } <=>`;
    steps.push("\\pi");
  } else {

  }


  console.log("lcm", MathX.lcm(deg, 180));
  console.log("gcd", MathX.gcd(deg, 180));


  return new ExerciseBuilder()
      .addQuestionHtml(expression)
      .addAnswerHtml(expression)
      .addStepAnswerLatex(...steps)
      .toJSON();

};


export const cartesianToPolar = () => {
  const expression = 1;
};