import MathObj, { MathObjType } from "../MathObj/MathObj";
import Constant from "../Constant/Constant";
import Fraction from "../Fraction/Fraction";
import Subtract from "../Subtract/Subtract";


export default class Add extends MathObj {
    type = MathObjType.add;

    left: MathObj;
    right: MathObj;

    atomic = false;

    constructor(left: MathObj, right: MathObj) {
        super();
        this.left = left;
        this.right = right;

        if (this.right.constant && this.right.constant.value < 0) {
            return new Subtract(this.left, new Constant(Math.abs(this.right.constant.value)));
        }
    }

    next: () => MathObj = () => {
        if (this.left.constant && this.right.constant) {
            return new Constant(this.left.constant.value + this.right.constant.value);
        } else if (this.left.fraction && this.right.fraction) {
            return (this.left as Fraction).add(this.right as Fraction);
        } else if (this.left.fraction && this.right.constant) {
            return new Add(this.left, (this.right as Constant).toFraction());
        } else if (this.left.constant && this.right.fraction) {
            return new Add((this.left as Constant).toFraction(), this.right);
        } else if (!this.left.atomic || !this.right.atomic) {
            return new Add(this.left.next(), this.right.next());
        }

        return this;
    }

    toNode() {
        return {
            add: [],
        };
    }

    toString = () => {
        return `${this.left.toString()} + ${this.right.toString()}`;
    };

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
        return `${left} + ${right}`;
    }
}
