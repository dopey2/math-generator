import { ConstantData } from "../Constant/Constant";
import { FractionData } from "../Fraction/Fraction";

export enum MathObjEnum {
    constant = "constant",
    fraction = "fraction",
    add = "add",
    subtract = "subtract",
    multiply = "multiply"
}

export default abstract class MathObj {
    abstract type: MathObjEnum;
    abstract atomic: boolean;

    constant?: ConstantData;
    fraction?: FractionData;

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

