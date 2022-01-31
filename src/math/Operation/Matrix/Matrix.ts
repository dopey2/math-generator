import MathObj, { MathObjType } from "../MathObj/MathObj";
import Constant from "../Constant/Constant";
import Add from "../Add/Add";
import Subtract from "../Subtract/Subtract";
import Multiply from "../Multiply/Multiply";
import Parenthesis from "../Parenthese/Parenthesis";

export interface MatrixData {
  /**
   * The values of the matrix as a two dimensional array.
   * The first dimension represent the row.
   * The second dimension represent the column
   */
  values: MathObj[][];
  /**
   * The number of rows
   */
  row: number;
  /**
   * The number of column
   */
  col: number;
}


export default class Matrix extends MathObj {
  type = MathObjType.matrix;

  /**
   * A matrix is atomic when every element composing the matrix are constants
   */
  atomic = true;

  matrix: MatrixData = {
      values: [],
      row: 0,
      col: 0,
  };

  /**
   * Return the values of the matrix as a 2 dimensional array of numbers
   */
  get values(): number[][] {
      if(!this.atomic) {
          throw "The matrix should be atomic";
      }

      const matrixValues: number[][] = [];
      for(const row of this.matrix.values) {
          const newRow = [];
          for(const col of row) {
              if(col.constant) {
                  newRow.push(col.constant.value);
              }
          }
          matrixValues.push(newRow);
      }
      return matrixValues;
  }

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

      this.matrix.row = this.matrix.values.length;
      this.matrix.col = this.matrix.values[0].length;
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


  /**
   * TODO WRITE UNITE TEST FOR THIS
   * @param matrix
   */
  multiply = (matrix: Matrix) => {
      if(this.matrix.col !== matrix.matrix.row) {
          throw "The number of columns of the 1st matrix must equal the number of rows of the 2nd matrix.";
      }

      const newMatrixValues: MathObj[][] = [];

      for(let i = 0; i < this.matrix.row; i++) {
          
          const newMatrixRow: MathObj[] = [];
            
          for(let j = 0; j < matrix.matrix.col; j++) {
              const operations: MathObj[] = [];

              for(let k = 0; k < matrix.matrix.row; k++) {
                  operations.push(new Multiply(this.getRow(i)[k], matrix.getCol(j)[k]));
              }
              
              let adds = new Add(operations[0], operations[1]);
              for(let l = 2; l < operations.length; l++) {
                  adds = new Add(adds, operations[l]);
              }

              newMatrixRow.push(adds);
          }
          
          newMatrixValues.push(newMatrixRow);
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
  
  static computeDeterminant = (matrix: Matrix) => {
      if(matrix.matrix.row !== matrix.matrix.col) {
          throw "The matrix should be square (Have the same number of row and column";
      }

      if(matrix.matrix.row === 2) {
          return new Subtract(
              new Multiply(
                  new Constant(matrix.values[0][0]),
                  new Constant(matrix.values[1][1])
              ),
              new Multiply(
                  new Constant(matrix.values[0][1]) ,
                  new Constant(matrix.values[1][0])
              )
          );
      } 
        
      let res: MathObj | null = null;
      
      for(let i = 0; i < matrix.matrix.col; i++) {
          let k = matrix.values[0][i];
          let subMatrixValues = matrix.matrix.values.slice(1, matrix.matrix.values.length);
          subMatrixValues = subMatrixValues.map((row) => row.filter((c, j) => j !== i));
          const subMatrix = new Matrix(subMatrixValues);
          const determinant = Matrix.computeDeterminant(subMatrix) as MathObj;
              
          const multiplyExpression = new Multiply(new Constant(k), new Parenthesis(determinant));
          
          if(res === null) {
              res = multiplyExpression;
          } else {

              if(i % 2 === 0) {
                  res = new Add(res, multiplyExpression);
              } else {
                  res = new Subtract(res, multiplyExpression);
              }    
          }
      }

      return res as MathObj;
  }
  
  getDeterminant = () => {
      return Matrix.computeDeterminant(this);
  }

  getRow = (r: number) => this.matrix.values[r];
  getCol = (c: number) => this.matrix.values.map((row) => row[c]);

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
