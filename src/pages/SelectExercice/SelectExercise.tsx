import React, { useCallback, useEffect, useState } from "react";

import {
  addition,
  division,
  fractionRulesExpression,
  multiplication,
  radical, xBaseExponent,
  xBaseExponentDivision,
  xBaseExponentMultiplication
} from "../../generator/arithmetics/arithmetics";
import {
    developExpressionSquareRoot1,
    developpeExpression2
} from "../../generator/arithmetics/developpeExpression/developpeExpression";
import {
    equation1,
    equation2,
    equation3,
    equation4,
    equation5, equation6, equation7,
    lineEquationFromPoints
} from "../../generator/arithmetics/equation";
import { ExerciseI } from "../../generator/ExerciseBuilder";
import { systemWith2Unknown } from "../../generator/linear_algebra/LinearSystem/linear_system";
import { probabilityWithIntersection } from "../../generator/probability/probability1";
import {
  enumerationDigitCode,
  enumerationLocker,
  enumerationPinCode
} from "../../generator/enumeration/enumeration";
import ExerciseComponent from "../../component/Exercice.component";
import { vectors1 } from "../../generator/linear_algebra/Vectors/Vectors";

const styles = {
  pageContainer: "flex flex-1 justify-center",
  contentContainer: "flex flex-col min w-6/12 p-8",
};

type ExerciseItem = {label: string, fun: () => ExerciseI};

const exerciseList: ExerciseItem[] = [
  { label: "Addition", fun: () => addition(3, 99) },
  { label: "Multiplication 1", fun: () => multiplication({ terms: 2, minNumber: 10, maxNumber: 20 }) },
  { label: "Multiplication 2", fun: () => multiplication({ terms: 2, minNumber: 22, maxNumber: 99 }) },
  { label: "Division 1", fun: () => division({ minNumber: 1, maxNumber: 10 }) },
  { label: "Division 2", fun: () => division({ minNumber: 10, maxNumber: 20 }) },
  { label: "Square Root", fun: () => radical(20) },
  { label: "X Base Exponent Multiplication", fun: () => xBaseExponentMultiplication() },
  { label: "X Base Exponent Division", fun: () => xBaseExponentDivision() },
  { label: "X Base Exponent", fun: () => xBaseExponent() },
   { label: "Square Root", fun: () => radical(20) },
   { label: "Develop Expression", fun: () => developpeExpression2() },
   { label: "Develop Expression square root", fun: () => developExpressionSquareRoot1() },
   { label: "Fraction rules", fun: () => fractionRulesExpression() },
   { label: "Equation 1", fun: () => equation1() },
   { label: "Equation 2", fun: () => equation2() },
   { label: "Equation 3", fun: () => equation3() },
   { label: "Equation 4 - fraction", fun: () => equation4() },
   { label: "Equation 5 - fraction", fun: () => equation5() },
   { label: "Equation 6 - fraction", fun: () => equation6() },
   { label: "Equation 7 - Square root", fun: () => equation7() },
   { label: "Line equation from point", fun: () => lineEquationFromPoints() },
   { label: "Linear system with 2 unknown", fun: () => systemWith2Unknown() },
   { label: "Enumeration locker", fun: () => enumerationLocker() },
   { label: "Enumeration locker 2", fun: () => enumerationDigitCode() },
   { label: "Enumeration pin code", fun: () => enumerationPinCode() },
   { label: "Probability with intersection", fun: () => probabilityWithIntersection() },
   { label: "Vecteurs", fun: () => vectors1() }
];

const SelectExercise = () => {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseKey, setExerciseKey] = useState(1);
  const [exercise, setExercise] = useState<ExerciseI | null>(null);

  const onSelectExercise = useCallback((e) => {
    const key = e.target.value;
    setExerciseKey(key);
  }, []);

  useEffect(() => {
    generateExercise();
  }, [exerciseKey]);

  const generateExercise = useCallback(() => {
    const { fun, label } = exerciseList[exerciseKey];

    setExercise(fun());
    setExerciseName(label);
    setExerciseKey(exerciseKey);
  }, [exerciseKey]);

  return (
      <div className={styles.pageContainer}>
        <div id={"capture"} className={styles.contentContainer}>

          <select onChange={onSelectExercise}>
            {exerciseList.map((ex, i) => (
                <option key={i} value={i} label={ex.label} />
            ))}
          </select>

          <button onClick={generateExercise}>new</button>

          <div className={'mt-8'}>
            {exercise && (
                <ExerciseComponent key={exerciseKey} title={exerciseName} exercise={[exercise]}/>
            )}
          </div>
        </div>
      </div>
  );
};

export default SelectExercise;