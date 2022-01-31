import MathObj, { MathObjType } from "../MathObj/MathObj";

export interface ParenthesisData {
  operation: MathObj
}

export default class Parenthesis extends MathObj {
  type = MathObjType.add;
  
  atomic = false;
  parenthesis: ParenthesisData;

  constructor(operation: MathObj) {
      super();
      
      this.parenthesis = {
          operation: operation,
      };
  }

  next: () => MathObj = () => {
      if(this.parenthesis.operation.constant) {
          return this.parenthesis.operation;
      } else {
          const solvedParenthesis = this.parenthesis.operation.next();
          if(solvedParenthesis.constant) {
              return solvedParenthesis;
          }
          return new Parenthesis(solvedParenthesis);
      }
  }

  toNode() {
      return {
          add: [],
      };
  }

  toString = () => {
      return `(${this.parenthesis.operation.toString()})`;
  };

  toTex = () => {
      return `(${this.parenthesis.operation.toTex()})`;
  }
}
