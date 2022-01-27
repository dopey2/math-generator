import MathObj, { MathObjType } from "../MathObj/MathObj";


export default class Matrix extends MathObj {
  type = MathObjType.matrix;
  atomic = true;

  /**
   * The values of the matrix as a two dimensional array.
   * The first dimension represent the row.
   * The second dimension represent the column
   */
  private values: number[][] = [];

  constructor(values: number[][]) {
      super();
      this.values = values;
  }

  next = () => {
      return this;
  };

  toString = (data?: any) => {
      return "";
  };

  toTex = (data?: any) => {

      let content = "";

      for(let row = 0; row < this.values.length; row++) {
          content += `\\ ${this.values[row][0]} `;

          for(let col = 1; col < this.values[row].length; col++) {
              content += `& ${this.values[row][col]}`;
          }

          content += `\\`;
      }

      return `\\begin{pmatrix}${content}end{pmatrix}`;
  }
}
