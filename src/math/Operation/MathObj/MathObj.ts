import { ConstantData } from "../Constant/Constant";
import { FractionData } from "../Fraction/Fraction";
import { MatrixData } from "../Matrix/Matrix";

export enum MathObjType {
    constant = "constant",
    fraction = "fraction",
    add = "add",
    subtract = "subtract",
    multiply = "multiply",
    matrix = "matrix"
}

export default abstract class MathObj {
    abstract type: MathObjType;
    abstract atomic: boolean;

    constant?: ConstantData;
    fraction?: FractionData;
    matrix?: MatrixData;

    abstract next: () => MathObj;
    abstract toString: (data?: any) => string;
    abstract toTex: (data?: {
        constant?: {
            showSign?: boolean,
            negativeOnly?: boolean,
            positiveOnly?: boolean,
            hideSign?: boolean,
            showNegativeInParenthesis?: boolean,
        }
    }) => string;

    solveAll = () => {
        const steps: MathObj[] = [this];
        while (!steps[steps.length - 1].atomic) {
            const expression = steps[steps.length - 1].next();
            steps.push(expression);
        }

        return steps;
    };

    solveAllToTex = () => {
        return this.solveAll().map((x) => x.toTex());
    };

    solve = () => {
        const steps = this.solveAll();
        return steps[steps.length - 1];
    };
}

