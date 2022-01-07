import React from "react";
import { Link, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import clsx from "clsx";


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
import { vectors1 } from "../../generator/linear_algebra/vectors";
import { pythagore } from "../../generator/geometry";
import MathX from "../../math/MathX/MathX";
import {degToRadian} from "../../generator/trigonometry/trigonometry";

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
    { label: "Pythagore", fun: () => pythagore() },
    { label: "Convert degree to radian", fun: () => degToRadian() }

];

interface State {
    exerciseName: string;
    exerciseKey: number | string;
    exercise: ExerciseI | null;
}

class SelectExercise extends React.PureComponent<RouteComponentProps<{ id: string }>, State> {


    constructor(props: any) {
        super(props);

        const state: any = {
            exerciseName: '',
            exercise: null,
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
            this.setState({ exerciseName: exercise.label, exercise: exercise.fun() });
        }
    };

    render() {


        console.log("atan2",MathX.radianToDeg(Math.atan2(-1,1)));
        console.log("atan", MathX.radianToDeg(Math.atan(-1/1)));

        return (
            <div className={styles.pageContainer}>

                <div className={styles.navMenu}>
                    <ul>
                        {exerciseList.map((ex, i) => (
                            <li
                                key={i}
                                className={clsx({
                                [styles.navItemSelected]: i === parseInt(this.props.match.params.id),
                                [styles.navItem]: true,
                            })}>
                                <Link to={`/select/${i}`}>{i} - {ex.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div id={"capture"} className={styles.contentContainer}>
                    <button onClick={this.generateExercise}>new</button>

                    <div className={'mt-8'}>
                        {this.state.exercise && (
                            <ExerciseComponent
                                key={this.state.exerciseKey}
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
    pageContainer: "flex flex-1 w-full h-full",
    navMenu: "flex flex-col w-96 h-full border-r-2 border-grey-300 pl-4 pr-4 pt-4 pb-4 overflow-scroll",
    navItem: "pl-4 pr-4 pt-2 pb-2",
    navItemSelected: "bg-green-300 text-white rounded-md",
    contentContainer: "flex flex-col flex-1 p-8",
};

