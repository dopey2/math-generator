import MathX from "../../math/MathX/MathX";
import ExerciseBuilder from "../ExerciseBuilder";
import Matrix from "../../math/Operation/Matrix/Matrix";

const generateRandomMatrix = (args?: {
    minValue?: number;
    maxValue?: number;
    row?: number
    col?: number;
    minRow?: number;
    maxRow?: number;
    minCol?: number;
    maxCol?: number;
}) => {
    let minValue = args?.minValue ?? -10;
    let maxValue = args?.maxValue ?? 10;
    let minRow = args?.minRow ?? 2;
    let maxRow = args?.maxRow ?? 6;
    let minCol = args?.minCol ?? 2;
    let maxCol = args?.maxCol ?? 6;

    let row = args?.row ?? MathX.random(minRow, maxRow);
    let col = args?.col ?? MathX.random(minCol, maxCol);

    const values: number[][] = [];

    for(let r = 0; r < row; r++) {
        let rowValues = [];

        for(let c = 0; c < col; c++) {
            rowValues.push(MathX.random(minValue, maxValue));
        }
        values.push(rowValues);
    }

    return values;
};

export const addMatrix = () => {
    const row = MathX.random(2, 3);
    const col = MathX.random(2, 3);
    const matrixValuesA = generateRandomMatrix({ row, col });
    const matrixValuesB = generateRandomMatrix({ row, col });
    const matrixA = new Matrix(matrixValuesA);
    const matrixB = new Matrix(matrixValuesB);

    const expression = 'Calculer A + B';
    const latexExpression = `A = ${matrixA.toTex()} ; B = ${matrixB.toTex()}`;
    const steps = matrixA.add(matrixB).solveAllToTex();
    const stepsLatex: string[] = [];
    steps.forEach((s) => stepsLatex.push(`A + B = ${s}`));

    return new ExerciseBuilder()
        .addQuestionLatexText(expression)
        .addQuestionLatex(latexExpression)
        .addStepAnswerLatex(...stepsLatex)
        .addAnswerLatex(stepsLatex[stepsLatex.length - 1])
        .toJSON();
};

export const subtractMatrix = () => {
    const row = MathX.random(2, 3);
    const col = MathX.random(2, 3);
    const matrixValuesA = generateRandomMatrix({ row, col });
    const matrixValuesB = generateRandomMatrix({ row, col });
    const matrixA = new Matrix(matrixValuesA);
    const matrixB = new Matrix(matrixValuesB);

    const expression = 'Calculer A - B';
    const latexExpression = `A = ${matrixA.toTex()} ; B = ${matrixB.toTex()}`;
    const steps = matrixA.subtract(matrixB).solveAllToTex();
    const stepsLatex: string[] = [];
    steps.forEach((s) => stepsLatex.push(`A - B = ${s}`));

    return new ExerciseBuilder()
        .addQuestionLatexText(expression)
        .addQuestionLatex(latexExpression)
        .addStepAnswerLatex(...stepsLatex)
        .addAnswerLatex(stepsLatex[stepsLatex.length - 1])
        .toJSON();
};

export const multiplyMatrixByConstant = () => {
    const row = MathX.random(2, 3);
    const col = MathX.random(2, 3);
    const matrixValues = generateRandomMatrix({ row, col });
    const k = MathX.random(-9, 9, [0, 1, -1]);
    const matrix = new Matrix(matrixValues);
    const latexExpression = `${k} * ${matrix.toTex()} =`;
    const steps = matrix.multiplyByConstant(k).solveAllToTex();
    const stepsLatex: string[] = [];
    steps.forEach((s) => stepsLatex.push(`${s} = `));

    return new ExerciseBuilder()
        .addQuestionLatex(latexExpression)
        .addStepAnswerLatex(...stepsLatex)
        .addAnswerLatex(stepsLatex[stepsLatex.length - 1])
        .toJSON();
};

export const transposeMatrix = () => {
    const row = MathX.random(2, 3);
    const col = MathX.random(2, 3);
    const matrixValues = generateRandomMatrix({ row, col });
    
    const matrix = new Matrix(matrixValues);

    const expression = "Transposer la matrice M";
    const latexExpression = `M = ${matrix.toTex()}`;
    const res = `M^{T} = ${matrix.transpose().toTex()}`;

    return new ExerciseBuilder()
        .addQuestionLatexText(expression)
        .addQuestionLatex(latexExpression)
        .addAnswerLatex(res)
        .toJSON();
};
