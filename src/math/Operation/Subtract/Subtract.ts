import MathObj, { MathObjType } from "../MathObj/MathObj";
import Constant from "../Constant/Constant";
import Fraction from "../Fraction/Fraction";
import Add from "../Add/Add";

export default class Subtract extends MathObj {
    type = MathObjType.subtract;

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
            if (this.right.constant.value < 0) {
                return new Add(this.left, new Constant(Math.abs(this.right.constant.value)));
            }
            return new Constant(this.left.constant.value - Math.abs(this.right.constant.value)) as MathObj;
        } else if (this.left.fraction && this.right.fraction) {
            return (this.left as Fraction).subtract(this.right as Fraction) as MathObj;
        } else if (this.left.fraction && this.right.constant) {
            return new Subtract(this.left, (this.right as Constant).toFraction() as MathObj) as MathObj;
        } else if (this.left.constant && this.right.fraction) {
            return new Subtract((this.left as Constant).toFraction() as MathObj, this.right) as MathObj;
        } else if (!this.left.atomic || !this.right.atomic) {
            return new Subtract(this.left.next(), this.right.next());
        }

        return this;
    }


    toNode() {
        return {
            add: [],
        };
    }

    toString = () => {
        const left = this.left.toTex({ constant: { negativeOnly: true } });
        const right = this.right.toTex({ constant: { hideSign: true } });
        return `${left} - ${right}`;
    }

    toTex = () => {
        const left = this.left.toTex({ constant: { negativeOnly: true } });
        const right = this.right.toTex({ constant: { showNegativeInParenthesis: true } });
        return `${left} - ${right}`;
    }
}
