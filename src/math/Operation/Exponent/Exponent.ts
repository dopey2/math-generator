import MathObj, { MathObjType } from "../MathObj/MathObj";
import Constant from "../Constant/Constant";


export default class Exponent extends MathObj {
  type = MathObjType.add;

  base: MathObj;
  exponent: MathObj;

  atomic = false;

  constructor(base: MathObj, exponent: MathObj) {
      super();

      this.base = base;
      this.exponent = exponent;
  }

  next: () => MathObj = () => {
      if (this.base.constant && this.exponent.constant) {
          return new Constant(this.base.constant.value ** this.exponent.constant.value);
      } else if (!this.base.atomic || !this.exponent.atomic) {
          return new Exponent(this.base.next(), this.exponent.next());
      }

      return this;
  }

  toNode() {
      return {
          exponent: [],
      };
  }

  toString = () => {
      return `${this.base.toString()} + ${this.exponent.toString()}`;
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
      const base = this.base.toTex({ constant: { showNegativeInParenthesis: data?.constant?.showNegativeInParenthesis } });
      const exponent = this.exponent.toTex();
      return `${base}^{${exponent}}`;
  }
}
