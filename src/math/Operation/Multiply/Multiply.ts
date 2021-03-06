import MathObj, { MathObjType } from "../MathObj/MathObj";
import Constant from "../Constant/Constant";
import Fraction from "../Fraction/Fraction";


export default class Multiply extends MathObj {
    type = MathObjType.multiply;

    left: MathObj;
    right: MathObj;

    atomic = false;

    constructor(left: MathObj, right: MathObj) {
        super();
        this.left = left;
        this.right = right;
    }

    next: () => MathObj = () => {
        if (this.left.constant && this.right.constant) {
            return new Constant(this.left.constant.value * this.right.constant.value);
        } else if (this.left.fraction && this.right.fraction) {
            return (this.left as Fraction).multiply(this.right as Fraction);
        } else if (this.left.fraction && this.right.constant) {
            if (!this.left.atomic) {
                return new Multiply(this.left.next(), this.right);
            }
            return new Multiply(this.left, new Fraction(this.right, new Constant(1)));
        } else if (this.left.constant && this.right.fraction) {
            if (!this.right.atomic) {
                return new Multiply(this.left, this.right.next());
            }
            return new Multiply(new Fraction(this.left, new Constant(1)), this.right);
        } else if (!this.left.atomic || !this.right.atomic) {
            return new Multiply(this.left.next(), this.right.next());
        }

        return this;
    }


    toNode = () => {
        return {
            multiply: [],
        };
    }

    toString = () => {
        return `${this.left.toString()} * ${this.right.toString({ constant: { showNegativeInParenthesis: true } })}`;
    }

    toTex = (data?: {
        constant?: {
            showSign?: boolean,
            negativeOnly?: boolean,
            positiveOnly?: boolean,
            hideSign?: boolean,
            showNegativeInParenthesis?: boolean,
        }
    }) => {
        const left = this.left.toTex({ constant: { showNegativeInParenthesis: data?.constant?.showNegativeInParenthesis } });
        const right = this.right.toTex({ constant: { showNegativeInParenthesis: true } });
        return `${left} * ${right}`;
    }
}
