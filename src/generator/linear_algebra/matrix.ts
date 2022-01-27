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
    const expression = 'Test matrices';

    const matrixValues = generateRandomMatrix({ row: 3, col: 3 });
    const matrix = new Matrix(matrixValues);


    const latexExpression = matrix.toTex();


    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addQuestionLatex(latexExpression)
        .addAnswerLatex("Todo answer")
        .toJSON();
};