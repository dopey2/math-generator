import React from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import {
    addition,
    division,
    multiplication,
    radical
} from "../../generator/arithmetics/arithmetics.gen";
import {
    developExpressionSquareRoot1,
    developpeExpression2, fractionRulesExpression, xBaseExponent, xBaseExponentDivision, xBaseExponentMultiplication
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
import { vectors1, vectors2 } from "../../generator/linear_algebra/vectors";
import { pythagore, triangleAAS } from "../../generator/geometry/triangle/triangles";
import {
    addMatrix, computeMatrixDeterminant, computeMatrixInverse2x2,
    multiplyMatrixByConstant, multiplyMatrixByMatrix,
    subtractMatrix,
    transposeMatrix
} from "../../generator/linear_algebra/matrix";
import Drawer from "../../component/Drawer/Drawer";


interface Category {
    id: string,
    label: string,
    parent: null,
}

const CategoryMap: {[key: string]: Category} = {
    arithmetic: {
        id: "arithmetic",
        label: "Arithmetic",
        parent: null,
    },
    developpe_expression: {
        id: "developpe_expression",
        label: "Developpe expression",
        parent: null,
    },
    equation: {
        id: "equation",
        label: "Equation",
        parent: null,
    },
    probability: {
        id: "probability",
        label: "Probability",
        parent: null,
    },
    linear_algebra: {
        id: "linear_algebra",
        label: "Linear algebra",
        parent: null,
    },
    geometry: {
        id: "geometry",
        label: "Geometry",
        parent: null,
    },
    other: {
        id: "other",
        label: "Other",
        parent: null,
    },
};

type ExerciseItem = {
    label: string,
    fun: () => ExerciseI
    cat?: string
};

const exerciseList: ExerciseItem[] = [
    { label: "Addition", fun: () => addition(3, 99), cat: CategoryMap.arithmetic.id },
    { label: "Multiplication 1", fun: () => multiplication({ terms: 2, minNumber: 10, maxNumber: 20 }), cat: CategoryMap.arithmetic.id },
    { label: "Multiplication 2", fun: () => multiplication({ terms: 2, minNumber: 22, maxNumber: 99 }), cat: CategoryMap.arithmetic.id },
    { label: "Division 1", fun: () => division({ minNumber: 1, maxNumber: 10 }), cat: CategoryMap.arithmetic.id },
    { label: "Division 2", fun: () => division({ minNumber: 10, maxNumber: 20 }), cat: CategoryMap.arithmetic.id },
    { label: "Square Root", fun: () => radical(20), cat: CategoryMap.arithmetic.id },

    { label: "X Base Exponent Multiplication", fun: () => xBaseExponentMultiplication(), cat: CategoryMap.developpe_expression.id },
    { label: "X Base Exponent Division", fun: () => xBaseExponentDivision(), cat: CategoryMap.developpe_expression.id },
    { label: "X Base Exponent", fun: () => xBaseExponent(), cat: CategoryMap.developpe_expression.id },
    { label: "Develop Expression", fun: () => developpeExpression2(), cat: CategoryMap.developpe_expression.id },
    { label: "Develop Expression square root", fun: () => developExpressionSquareRoot1(), cat: CategoryMap.developpe_expression.id },
    { label: "Fraction rules", fun: () => fractionRulesExpression(), cat: CategoryMap.developpe_expression.id },

    { label: "Equation 1", fun: () => equation1(), cat: CategoryMap.equation.id },
    { label: "Equation 2", fun: () => equation2(), cat: CategoryMap.equation.id },
    { label: "Equation 3", fun: () => equation3(), cat: CategoryMap.equation.id },
    { label: "Equation 4 - fraction", fun: () => equation4(), cat: CategoryMap.equation.id },
    { label: "Equation 5 - fraction", fun: () => equation5(), cat: CategoryMap.equation.id },
    { label: "Equation 6 - fraction", fun: () => equation6(), cat: CategoryMap.equation.id },
    { label: "Equation 7 - Square root", fun: () => equation7(), cat: CategoryMap.equation.id },
    { label: "Line equation from point", fun: () => lineEquationFromPoints(), cat: CategoryMap.equation.id },
    { label: "Linear system with 2 unknown", fun: () => systemWith2Unknown(), cat: CategoryMap.equation.id },

    { label: "Enumeration locker", fun: () => enumerationLocker(), cat: CategoryMap.probability.id },
    { label: "Enumeration locker 2", fun: () => enumerationDigitCode(), cat: CategoryMap.probability.id },
    { label: "Enumeration pin code", fun: () => enumerationPinCode(), cat: CategoryMap.probability.id },
    { label: "Probability with intersection", fun: () => probabilityWithIntersection(), cat: CategoryMap.probability.id },

    { label: "Vecteurs", fun: () => vectors1(), cat: CategoryMap.linear_algebra.id },
    { label: "Vecteurs 2", fun: () => vectors2(), cat: CategoryMap.linear_algebra.id },
    { label: "Add matrix", fun: () => addMatrix(), cat: CategoryMap.linear_algebra.id },
    { label: "Subtract matrix", fun: () => subtractMatrix(), cat: CategoryMap.linear_algebra.id },
    { label: "Multiply matrix by constant", fun: () => multiplyMatrixByConstant(), cat: CategoryMap.linear_algebra.id },
    { label: "Multiply matrix by matrix", fun: () => multiplyMatrixByMatrix(), cat: CategoryMap.linear_algebra.id },
    { label: "Transpose matrix", fun: () => transposeMatrix(), cat: CategoryMap.linear_algebra.id },
    { label: "Calculate matrix determinant", fun: () => computeMatrixDeterminant(), cat: CategoryMap.linear_algebra.id },
    { label: "Calculate matrix inverse", fun: () => computeMatrixInverse2x2(), cat: CategoryMap.linear_algebra.id },

    { label: "Pythagore", fun: () => pythagore(), cat: CategoryMap.geometry.id },
    { label: "Triangle AAS", fun: () => triangleAAS(), cat: CategoryMap.geometry.id },
    { label: "Square area", fun: () => getSquareArea(), cat: CategoryMap.geometry.id },
    { label: "Convert degree to radian", fun: () => degToRadian(), cat: CategoryMap.geometry.id }
];

interface State {
    exerciseName: string;
    exercise: ExerciseI | null;
    refreshKey: number;
}

class SelectExercise extends React.PureComponent<RouteComponentProps<{ id: string, category?: string }>, State> {


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

    getDrawerItems() {
        const exercisesByCat: {[key: string]: any} = {};
        const others: any = [];

        exerciseList.forEach((exercise, i) => {

            if(exercise.cat) {
                const cat = CategoryMap[exercise.cat];

                if(cat) {
                    if(!exercisesByCat[exercise.cat]) {

                        console.log("category", this.props.match.params.category);

                        exercisesByCat[exercise.cat] = {
                            label: cat.label,
                            path: `select/${cat.id}`,
                            items: [],
                            isSelected: cat.id === this.props.match.params.category,
                        };
                    }

                    exercisesByCat[exercise.cat].items.push({
                        label: exercise.label,
                        path: `/select/${cat.id}/${i}`,
                        isSelected: i === parseInt(this.props.match.params.id),
                    });
                }
            } else {
                others.push({
                    path: `/select/${i}`,
                    label: `${i} - ${exercise.label}`,
                    isSelected: i === parseInt(this.props.match.params.id),
                });
            }
        });

        return [...Object.values(exercisesByCat), ...others];
    }

    render() {
        return (
            <div className={styles.content}>

                <Drawer items={this.getDrawerItems() as any} />

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

