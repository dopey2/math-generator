import { get, set } from 'lodash';

import { addition, division, multiplication, radical } from "../../generator/arithmetics/arithmetics.gen";
import {
    developExpressionSquareRoot1,
    developpeExpression2,
    fractionRulesExpression,
    xBaseExponent,
    xBaseExponentDivision,
    xBaseExponentMultiplication
} from "../../generator/arithmetics/developpeExpression/developpeExpression";
import {
    equation1,
    equation2,
    equation3,
    equation4,
    equation5,
    equation6,
    equation7,
    lineEquationFromPoints
} from "../../generator/algebra/equation.gen";
import { systemWith2UnknownBySubstitution } from "../../generator/linear_algebra/linearSystem";
import { enumerationDigitCode, enumerationLocker, enumerationPinCode } from "../../generator/enumeration/enumeration";
import { probabilityWithIntersection } from "../../generator/probability/probability1";
import { vectorFromUnitVector, vectors1, vectors2, vectors3 } from "../../generator/linear_algebra/vectors";
import {
    addMatrix,
    computeMatrixDeterminant,
    computeMatrixInverse2x2,
    multiplyMatrixByConstant,
    multiplyMatrixByMatrix,
    subtractMatrix,
    transposeMatrix
} from "../../generator/linear_algebra/matrix";
import { pythagore, triangleAAS } from "../../generator/geometry/triangle/triangles";
import { getSquareArea } from "../../generator/geometry/geometry";
import { degToRadian } from "../../generator/trigonometry/trigonometry";
import { ExerciseI } from "../../generator/ExerciseBuilder";
import { factorisation1 } from "../../generator/algebra/factorisation";

interface Category {
  id: string,
  label: string,
  parent?: string | null,
}

export const CategoryMap: { [key: string]: Category } = {
    arithmetic: {
        id: "arithmetic",
        label: "Arithmetic",
        parent: null,
    },
    algebra: {
        id: "algebra",
        label: "Algebra",
        parent: null,
    },
    developpe_expression: {
        id: "developpe_expression",
        label: "Developpe expression",
        parent: "algebra",
    },
    factor_expression: {
        id: "factor_expression",
        label: "Factor expression",
        parent: "algebra",
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
  cat: string,
  data?: any
};

export const exerciseList: ExerciseItem[] = [
    { label: "Addition", fun: () => addition(3, 99), cat: CategoryMap.arithmetic.id },
    {
        label: "Multiplication 1",
        fun: () => multiplication({ terms: 2, minNumber: 10, maxNumber: 20 }),
        cat: CategoryMap.arithmetic.id,
    },
    {
        label: "Multiplication 2",
        fun: () => multiplication({ terms: 2, minNumber: 22, maxNumber: 99 }),
        cat: CategoryMap.arithmetic.id,
    },
    { label: "Division 1", fun: () => division({ minNumber: 1, maxNumber: 10 }), cat: CategoryMap.arithmetic.id },
    { label: "Division 2", fun: () => division({ minNumber: 10, maxNumber: 20 }), cat: CategoryMap.arithmetic.id },
    { label: "Square Root", fun: () => radical(20), cat: CategoryMap.arithmetic.id },

    {
        label: "X Base Exponent Multiplication",
        fun: () => xBaseExponentMultiplication(),
        cat: CategoryMap.developpe_expression.id,
    },
    { label: "X Base Exponent Division", fun: () => xBaseExponentDivision(), cat: CategoryMap.developpe_expression.id },
    { label: "X Base Exponent", fun: () => xBaseExponent(), cat: CategoryMap.developpe_expression.id },
    { label: "Develop Expression", fun: () => developpeExpression2(), cat: CategoryMap.developpe_expression.id },
    {
        label: "Develop Expression square root",
        fun: () => developExpressionSquareRoot1(),
        cat: CategoryMap.developpe_expression.id,
    },
    { label: "Fraction rules", fun: () => fractionRulesExpression(), cat: CategoryMap.developpe_expression.id },

    { label: "Factorisation 1", fun: () => factorisation1(), cat: CategoryMap.factor_expression.id },

    { label: "Equation 1", fun: () => equation1(), cat: CategoryMap.equation.id },
    { label: "Equation 2", fun: () => equation2(), cat: CategoryMap.equation.id },
    { label: "Equation 3", fun: () => equation3(), cat: CategoryMap.equation.id },
    { label: "Equation 4 - fraction", fun: () => equation4(), cat: CategoryMap.equation.id },
    { label: "Equation 5 - fraction", fun: () => equation5(), cat: CategoryMap.equation.id },
    { label: "Equation 6 - fraction", fun: () => equation6(), cat: CategoryMap.equation.id },
    { label: "Equation 7 - Square root", fun: () => equation7(), cat: CategoryMap.equation.id },
    { label: "Line equation from point", fun: () => lineEquationFromPoints(), cat: CategoryMap.equation.id },
    {
        label: "Linear System - 2 - Substitution",
        fun: () => systemWith2UnknownBySubstitution(),
        cat: CategoryMap.equation.id,
    },

    { label: "Enumeration locker", fun: () => enumerationLocker(), cat: CategoryMap.probability.id },
    { label: "Enumeration locker 2", fun: () => enumerationDigitCode(), cat: CategoryMap.probability.id },
    { label: "Enumeration pin code", fun: () => enumerationPinCode(), cat: CategoryMap.probability.id },
    { label: "Probability with intersection", fun: () => probabilityWithIntersection(), cat: CategoryMap.probability.id },

    { label: "Vecteurs", fun: () => vectors1(), cat: CategoryMap.linear_algebra.id },
    { label: "Vecteurs 2", fun: () => vectors2(), cat: CategoryMap.linear_algebra.id },
    { label: "Vecteurs 3", fun: () => vectors3(), cat: CategoryMap.linear_algebra.id },
    { label: "Vector from unit vector", fun: () => vectorFromUnitVector(), cat: CategoryMap.linear_algebra.id },
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


// TODO memoize
export const getExerciseByCat = () => {
    const exerciseByCat: any = {};

    exerciseList.forEach((exercise, i) => {
        let tempCat = CategoryMap[exercise.cat];
        const cats = [tempCat.id];

        while(tempCat.parent) {
            const parentCat = CategoryMap[tempCat.parent];
            cats.unshift(parentCat.id);
            tempCat = parentCat;
        }

        const _exercise = { ...exercise };
        _exercise.data = {
            index: i,
        };


        const exerciseForCat = get(exerciseByCat, cats, []);
        exerciseForCat.push(_exercise);
        set(exerciseByCat, cats, exerciseForCat);
    });

    return exerciseByCat;
};
