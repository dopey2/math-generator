import React from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import {
    addition,
    division,
    fractionRulesExpression,
    multiplication,
    radical, xBaseExponent,
    xBaseExponentDivision,
    xBaseExponentMultiplication
} from "../../generator/arithmetics/arithmetics.gen";
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
} from "../../generator/arithmetics/equation.gen";
import { ExerciseI } from "../../generator/ExerciseBuilder";
import { systemWith2Unknown } from "../../generator/linear_algebra/linearSystem";
import { probabilityWithIntersection } from "../../generator/probability/probability1";
import {
    enumerationDigitCode,
    enumerationLocker,
    enumerationPinCode
} from "../../generator/enumeration/enumeration";
import ExerciseComponent from "../../component/Exercice.component";
import { getSquareArea } from "../../generator/geometry/geometry";
import { degToRadian } from "../../generator/trigonometry/trigonometry";
import { vectors1 } from "../../generator/linear_algebra/vectors";
import { pythagore, triangleAAS } from "../../generator/geometry/triangle/triangles";
import {
    addMatrix, computeMatrixDeterminant, computeMatrixInverse2x2,
    multiplyMatrixByConstant, multiplyMatrixByMatrix,
    subtractMatrix,
    transposeMatrix
} from "../../generator/linear_algebra/matrix";
import Drawer from "../../component/Drawer/Drawer";

type ExerciseItem = { label: string, fun: () => ExerciseI };

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
    { label: "Vecteurs", fun: () => vectors1() },
    { label: "Add matrix", fun: () => addMatrix() },
    { label: "Subtract matrix", fun: () => subtractMatrix() },
    { label: "Multiply matrix by constant", fun: () => multiplyMatrixByConstant() },
    { label: "Multiply matrix by matrix", fun: () => multiplyMatrixByMatrix() },
    { label: "Transpose matrix", fun: () => transposeMatrix() },
    { label: "Calculate matrix determinant", fun: () => computeMatrixDeterminant() },
    { label: "Calculate matrix inverse", fun: () => computeMatrixInverse2x2() },
    { label: "Pythagore", fun: () => pythagore() },
    { label: "Triangle AAS", fun: () => triangleAAS() },
    { label: "Square area", fun: () => getSquareArea() },
    { label: "Convert degree to radian", fun: () => degToRadian() }
];

interface State {
    exerciseName: string;
    exercise: ExerciseI | null;
    refreshKey: number;
}

class SelectExercise extends React.PureComponent<RouteComponentProps<{ id: string }>, State> {


    constructor(props: any) {
        super(props);

        const state: any = {
            exerciseName: '',
            exercise: null,
            refreshKey: 0,
        };

        const pathId = this.props.match.params.id;
        const key = parseInt(pathId);
        const exercise = exerciseList[key];

        if (key && exercise) {
            state.exercise = exercise.fun();
            state.exerciseName = exercise.label;
        }

        this.state = state;
    }

    componentDidUpdate(prevProps: Readonly<RouteComponentProps<{ id: string }>>) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.generateExercise();
        }
    }

    generateExercise = () => {
        const pathId = this.props.match.params.id;
        const key = parseInt(pathId);
        const exercise = exerciseList[key];

        if (exercise) {
            this.setState((prevState) => ({
                exerciseName: exercise.label,
                exercise: exercise.fun(),
                refreshKey: prevState.refreshKey + 1,
            }));
        }
    };

    render() {
        return (
            <div className={styles.content}>

                <Drawer items={[
                    {
                        label: "Arithmetic",
                        path: "/nested",
                        items: [
                            {
                                label: "Subcat 1",
                                path: "/nested/subcat1",

                            },
                            {
                                label: "Subcat 2",
                                path: "/nested/subcat2",

                            }
                        ],
                    },
                    ...exerciseList.map((ex, i) => ({
                        path: `/select/${i}`,
                        label: `${i} - ${ex.label}`,
                        isSelected: i === parseInt(this.props.match.params.id),
                    }))]} />

                <div className={styles.contentContainer}>
                    <button onClick={this.generateExercise}>new</button>

                    <div className={styles.exerciseContainer}>
                        {this.state.exercise && (
                            <ExerciseComponent
                                key={this.state.refreshKey}
                                title={this.state.exerciseName}
                                exercise={[this.state.exercise]}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

// @ts-ignore
export default withRouter(SelectExercise);

const styles = {
    content: "flex flex-1 overflow-y-hidden",
    contentContainer: "flex flex-col flex-1 p-8 overflow-y-scroll",
    exerciseContainer: "mt-8 flex-1 w-full",
};

