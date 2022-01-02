import React, { useMemo, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

import { times } from "../../generator/utils";
import {
    addition,
    division,
    fractionRulesExpression,
    multiplication,
    radical,
    xBaseExponentDivision,
    xBaseExponentMultiplication
} from "../../generator/arithmetics/arithmetics.gen";
import ExerciseComponent from "../../component/Exercice.component";
import {
    developpeExpression2
} from "../../generator/arithmetics/developpeExpression/developpeExpression";
import { equation1, equation2, lineEquationFromPoints } from "../../generator/arithmetics/equation.gen";
import { ExerciseI } from "../../generator/ExerciseBuilder";
import { systemWith2Unknown } from "../../generator/linear_algebra/linearSystem";

const styles = {
    pageContainer: "flex flex-1 justify-center",
    contentContainer: "flex flex-col min w-6/12 p-8",
};

const generateExercises = () => {
    const additionExpressions: ExerciseI[] = [];
    const multiplicationExpressions: ExerciseI[] = [];
    const divisionsExpressions: ExerciseI[] = [];
    const radicalExpressions: ExerciseI[] = [];
    const xBaseExponentMultiplications: ExerciseI[] = [];
    const xBaseExponentDivisions: ExerciseI[] = [];
    const developpeExpressions1: ExerciseI[] = [];
    const developpeExpressionsSquareRoot1: ExerciseI[] = [];
    const fractionRulesExpressions: ExerciseI[] = [];
    const geometryExercises: ExerciseI[] = [];
    const equation1Exercises: ExerciseI[] = [];
    const linearSystem: ExerciseI[] = [];

    times(2, () => additionExpressions.push(addition(3, 99)));

    times(4, () => multiplicationExpressions.push(multiplication({ terms: 2, minNumber: 10, maxNumber: 20 })));
    times(2, () => multiplicationExpressions.push(multiplication({ terms: 2, minNumber: 20, maxNumber: 99 })));

    times(2, () => divisionsExpressions.push(division({ minNumber: 1, maxNumber: 10 })));
    times(2, () => divisionsExpressions.push(division({ minNumber: 10, maxNumber: 20 })));

    times(2, () => radicalExpressions.push(radical(20)));
    times(1, () => xBaseExponentMultiplications.push(xBaseExponentMultiplication()));
    times(1, () => xBaseExponentDivisions.push(xBaseExponentDivision()));
    times(2, () => developpeExpressions1.push(developpeExpression2()));
    // times(1, () => developpeExpressionsSquareRoot1.push(developpeExpressionSquareRoot1()));
    //@ts-ignore
    times(1, () => fractionRulesExpressions.push(fractionRulesExpression()));
    // times(1, () => geometryExercises.push(pythagore()));
    times(1, () => equation1Exercises.push(equation1()));
    times(1, () => equation1Exercises.push(equation2()));
    times(1, () => equation1Exercises.push(lineEquationFromPoints()));
    times(1, () => linearSystem.push(systemWith2Unknown()));

    return {
        additionExpressions,
        multiplicationExpressions,
        divisionsExpressions,
        radicalExpressions,
        xBaseExponentMultiplications,
        xBaseExponentDivisions,

        developpeExpressions1,
        developpeExpressionsSquareRoot1,

        fractionRulesExpressions,
        geometryExercises,
        equation1Exercises,
        linearSystem,
    };
};


const QuestionGenerator = () => {
    const [exerciseKey, setExerciseKey] = useState(0);

    const onClickPdf = () => {
        // @ts-ignore
        html2canvas(document.querySelector("#capture")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            //@ts-ignore
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save("download.pdf");
        });
    };

    const getExercises = useMemo(() => {
        return generateExercises();
    }, [exerciseKey]);

    const {
        additionExpressions,
        multiplicationExpressions,
        divisionsExpressions,
        radicalExpressions,
        xBaseExponentMultiplications,
        xBaseExponentDivisions,
        developpeExpressions1,
        fractionRulesExpressions,
        geometryExercises,
        developpeExpressionsSquareRoot1,
        equation1Exercises,
        linearSystem,
    } = getExercises;


    console.log(fractionRulesExpressions);

    return (
        <div className={styles.pageContainer}>
            <div id={"capture"} className={styles.contentContainer}>

                <div className={"mt-4"}>
                    <ExerciseComponent title={"Linear system"} exercise={linearSystem}/>
                </div>

                <div className={"mt-4"}>
                    <ExerciseComponent title={"Equation"} exercise={equation1Exercises}/>
                </div>

                {/*<div className={"mt-4"}>*/}
                {/*    <ExerciseComponent title={"Geometry"} exercise={geometryExercises} />*/}
                {/*</div>*/}

                <div className={"mt-4"}>
                    <ExerciseComponent title={"Additions"} exercise={additionExpressions}/>
                </div>

                <div className={"mt-4"}>
                    <ExerciseComponent title={"Multiplications"} exercise={multiplicationExpressions}/>
                </div>

                <div className={"mt-4"}>
                    <ExerciseComponent title={"Divisions"} exercise={divisionsExpressions}/>
                </div>

                <div className={"mt-4"}>
                    <ExerciseComponent title={"Division rules"} exercise={fractionRulesExpressions} />
                </div>

                <div className={"mt-4"}>
                    <ExerciseComponent title={"Radicals"} exercise={radicalExpressions}/>
                </div>

                <div className={"mt-4"}>
                    <ExerciseComponent
                        title={"Exponent operations"}
                        exercise={[...xBaseExponentMultiplications, ...xBaseExponentDivisions]}
                    />
                </div>

                <div className={"mt-4"}>
                    <ExerciseComponent
                        title={"Developpe"}
                        exercise={developpeExpressions1}
                    />
                </div>

                {/*<div className={"mt-4"}>*/}
                {/*    <ExerciseComponent*/}
                {/*        title={"Developpe square root"}*/}
                {/*        exercise={developpeExpressionsSquareRoot1}*/}
                {/*    />*/}
                {/*</div>*/}
            </div>

            <button onClick={onClickPdf}>PDF</button>
            <button onClick={() => setExerciseKey((key) => key + 1)}>new</button>
        </div>
    );
};

export default QuestionGenerator;