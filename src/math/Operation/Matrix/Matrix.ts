import MathObj, { MathObjType } from "../MathObj/MathObj";
import Constant from "../Constant/Constant";
import Add from "../Add/Add";
import Subtract from "../Subtract/Subtract";
import Multiply from "../Multiply/Multiply";

export interface MatrixData {
  /**
   * The values of the matrix as a two dimensional array.
   * The first dimension represent the row.
   * The second dimension represent the column
   */
  values: MathObj[][]
}


export default class Matrix extends MathObj {
  type = MathObjType.matrix;

  /**
   * A matrix is atomic when every element composing the matrix are constants
   */
  atomic = true;


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

  add = (matrix: Matrix) => {
      const newMatrixValues: MathObj[][] = [];
    
      for(let r = 0; r < this.matrix.values.length; r++) {
          const newRow: MathObj[] = [];
        
          for(let c = 0; c < this.matrix.values[r].length; c++) {
              const constA = this.matrix.values[r][c];
              const constB = matrix.matrix.values[r][c];
              if(constA && constB) {
                  newRow.push(new Add(constA, constB));
              }
          }

          newMatrixValues.push(newRow);
      }

      const newMatrix = new Matrix(newMatrixValues);
      newMatrix.atomic = false;
      return newMatrix;
  }

  subtract = (matrix: Matrix) => {
      const newMatrixValues: MathObj[][] = [];

      for(let r = 0; r < this.matrix.values.length; r++) {
          const newRow: MathObj[] = [];

          for(let c = 0; c < this.matrix.values[r].length; c++) {
              const constA = this.matrix.values[r][c];
              const constB = matrix.matrix.values[r][c];
              if(constA && constB) {
                  newRow.push(new Subtract(constA, constB));
              }
          }

          newMatrixValues.push(newRow);
      }

      const newMatrix = new Matrix(newMatrixValues);
      newMatrix.atomic = false;
      return newMatrix;
  }

  
  multiplyByConstant(k: number): Matrix;
  multiplyByConstant(k: Constant): Matrix;
  multiplyByConstant(_k: number | Constant) {
      let k = _k;
      
      if(typeof k === "number") {
          k = new Constant(k);
      }

      const newMatrixValues: MathObj[][] = [];

      for(const row of this.matrix.values) {
          const newRow: MathObj[] = [];

          for(const col of row) {
              newRow.push(new Multiply(k, col));
          }

          newMatrixValues.push(newRow);
      }

      const newMatrix = new Matrix(newMatrixValues);
      newMatrix.atomic = false;
      return newMatrix;
  }

  transpose = () => {
      const transposedValues: MathObj[][] = [];
      
      for(let r = 0; r < this.matrix.values.length; r++) {
          for(let c = 0; c < this.matrix.values[r].length; c++) {
              if(!transposedValues[c]) {
                  transposedValues[c] = [];
              }
              transposedValues[c][r] = this.matrix.values[r][c];
          }
      }
      
      return new Matrix(transposedValues);      
  }

  // @ts-ignore
  next = () => {
      if(!this.atomic) {
          let atomic = true;
          const newMatrixValues: MathObj[][] = [];
          
          for(const row of this.matrix.values) {
              const newRow: MathObj[] = [];

              for(const column of row) {
                  const solved = column.next();
                  newRow.push(solved);
                  atomic = atomic && solved.type === "constant" && !!solved.constant;
              }

              newMatrixValues.push(newRow);
          }

          const newMatrix = new Matrix(newMatrixValues);
          newMatrix.atomic = atomic;
          return newMatrix;
      }

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
