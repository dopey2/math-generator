import MathObj, { MathObjType } from "../MathObj/MathObj";
import Fraction, { ToFraction } from "../Fraction/Fraction";


export interface ConstantData {
    value: number;
    sign: '+' | '-';
}

export default class Constant extends MathObj implements ToFraction {
    type = MathObjType.constant;
    atomic = true;
    constant: ConstantData;


    constructor(value: number) {
        super();

        this.constant = {
            value,
            sign: value > 0 ? '+' : '-',
        };
    }

    next: () => MathObj = () => {
        return this as MathObj;
    };

    toString = (showSign?: boolean) => {
        return showSign ? `${this.constant.sign} ${this.constant.value}` : `${Math.abs(this.constant.value)}`;
    };

    toTex = (data?: {
        constant?: {
            showSign?: boolean,
            negativeOnly?: boolean,
            positiveOnly?: boolean,
            hideSign?: boolean,
            showNegativeInParenthesis?: boolean
        }
    }) => {
        if (data && data.constant) {
            const { showSign, negativeOnly, hideSign, positiveOnly, showNegativeInParenthesis } = data.constant;

            if (showSign) {
                return `${this.constant.sign} ${Math.abs(this.constant.value)}`;
            }

            if (showNegativeInParenthesis && this.constant.value < 0) {
                return `(${this.constant.value})`;
            }

            if (negativeOnly && this.constant.value < 0) {
                return `${this.constant.value}`;
            }

            if (positiveOnly && this.constant.value > 0) {
                return `+ ${this.constant.value}`;
            }

            if (hideSign) {
                return Math.abs(this.constant.value).toString();
            }
        }


        return `${this.constant.value}`;
    }

    toFraction() {
        return new Fraction(this as MathObj, new Constant(1));
    }

}