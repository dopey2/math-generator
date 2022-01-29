import MathObj, { MathObjType } from "../MathObj/MathObj";
import Constant from "../Constant/Constant";

export interface MatrixData {
  values: MathObj[][]
}


export default class Matrix extends MathObj {
  type = MathObjType.matrix;
  atomic = true;

  /**
   * The values of the matrix as a two dimensional array.
   * The first dimension represent the row.
   * The second dimension represent the column
   */
  private matrix: MatrixData = {
      values: [],
  };

  constructor(values: MathObj[][])
  constructor(values: number[][])
  constructor(...args: any) {
      super();
      const values = args[0];
      
      if(typeof values[0][0] === "number") {
          const mathObjValues = [];
          for(const row of values) {
              const mathObjRow = [];
              for(const value of row) {
                  mathObjRow.push(new Constant(value));
              }
              mathObjValues.push(mathObjRow);
          }
          this.matrix.values = mathObjValues;
      } else {
          this.matrix.values = values;
      }


  }

  // TODO use MathObj Add operation
  add = (matrix: Matrix) => {
      const newMatrixValues: number[][] = [];
    
      for(let r = 0; r < this.matrix.values.length; r++) {
          const newRow: number[] = [];
        
          for(let c = 0; c < this.matrix.values[r].length; c++) {
              const constA = this.matrix.values[r][c].constant;
              const constB = matrix.matrix.values[r][c].constant;
              if(constA && constB) {
                  newRow.push(constA.value + constB.value);
              }
          }

          newMatrixValues.push(newRow);
      }

      const newMatrix = new Matrix(newMatrixValues);
      newMatrix.atomic = false;
      return newMatrix;
  }

  // TODO use MathObj Add operation
  subtract = (matrix: Matrix) => {
      const newMatrixValues: number[][] = [];

      for(let r = 0; r < this.matrix.values.length; r++) {
          const newRow: number[] = [];

          for(let c = 0; c < this.matrix.values[r].length; c++) {
              const constA = this.matrix.values[r][c].constant;
              const constB = matrix.matrix.values[r][c].constant;
              if(constA && constB) {
                  newRow.push(constA.value - constB.value);
              }
          }

          newMatrixValues.push(newRow);
      }

      const newMatrix = new Matrix(newMatrixValues);
      newMatrix.atomic = false;
      return newMatrix;
  }

  // TODO code this
  // @ts-ignore
  next = () => {
      return this;
  };

  toString = (data?: any) => {
      return "";
  };

  toTex = (data?: any) => {

      let content = "";

      for(let row = 0; row < this.matrix.values.length; row++) {
          content += `\\ ${this.matrix.values[row][0].toTex()} `;

          for(let col = 1; col < this.matrix.values[row].length; col++) {
              content += `& ${this.matrix.values[row][col].toTex()}`;
          }

          content += `\\`;
      }

      return `\\begin{pmatrix}${content}end{pmatrix}`;
  }
}
