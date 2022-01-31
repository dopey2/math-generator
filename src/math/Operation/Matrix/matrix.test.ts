import Matrix from "./Matrix";

const matrixA = new Matrix([
    [1, 2],
    [3, 4]
]);

const matrixB = new Matrix([
    [5, -6],
    [-7, 8]
]);

const matrixC = new Matrix([
    [2, 3, -4],
    [5, -6, 7]
]);

const matrixD = new Matrix([
    [3, 5, 8],
    [4, 2, 3] 
]);

const matrixE = new Matrix([
    [2, 3],
    [4, 5],
    [6, 7]
]);


describe("Add matrix", () => {
    it("Add case 1", () => {
        const matrix = matrixA.add(matrixB).solve<Matrix>();
        expect(matrix.values).toEqual([
            [6, -4],
            [-4, 12]
        ]);
    });

    it("Add case 2", () => {
        const matrix = matrixC.add(matrixD).next();
        expect(matrix.values).toEqual([
            [5, 8, 4],
            [9, -4, 10]
        ]);
    });
    
});

describe("Subtract matrix", () => {
    it("Subtract case 1", () => {
        const matrix = matrixA.subtract(matrixB).solve<Matrix>();
        expect(matrix.values).toEqual([
            [-4, 8],
            [10, -4]
        ]);
    });

    it("Subtract case 2", () => {
        let matrix = matrixC.subtract(matrixD).solve<Matrix>();

        expect(matrix.values).toEqual([
            [-1, -2, -12],
            [1, -8, 4]
        ]);
    });
});


describe("Multiply matrix by constant", () => {
    it("Multiply by constant case 1", () => {
        const matrix = matrixA.multiplyByConstant(2).solve<Matrix>();
        expect(matrix.values).toEqual([
            [2, 4],
            [6, 8]
        ]);
    });

    it("Multiply by constant case 2", () => {
        let matrix = matrixC.multiplyByConstant(-3).solve<Matrix>();
        expect(matrix.values).toEqual([
            [-6, -9, 12],
            [-15, 18, -21]
        ]);
    });
});

describe("Transpose matrix", () => {
    it("Transpose matrix case 1", () => {
        const matrix = matrixA.transpose();
        expect(matrix.values).toEqual([
            [1, 3],
            [2, 4]
        ]);
    });

    it("Transpose matrix case 2", () => {
        let matrix = matrixC.transpose();
        expect(matrix.values).toEqual([
            [2, 5],
            [3, -6],
            [-4, 7]
        ]);
    });

    it("Transpose matrix case 3", () => {
        let matrix = matrixE.transpose();
        expect(matrix.values).toEqual([
            [2, 4, 6],
            [3, 5, 7]
        ]);
    });
});

describe("Compute determinant", () => {

    it("Case 2x2", () => {
        const d = Matrix.computeDeterminant(new Matrix([
            [2, 3],
            [5, 6]
        ]));

        const dSolved = d.solve();

        expect(dSolved.constant).toBeDefined();
        if(dSolved.constant) {
            expect(dSolved.constant.value).toBe(-3);
        }
    });

    it("Case 3x3", () => {
        const d = Matrix.computeDeterminant(new Matrix([
            [2, 3, 4],
            [5, 6, 7],
            [8, 9, 7]
        ]));

        const dSolved = d.solve();

        expect(dSolved.constant).toBeDefined();
        if(dSolved.constant) {
            expect(dSolved.constant.value).toBe(9);
        }
    });

    it("Case 4x4", () => {
        const d = Matrix.computeDeterminant(new Matrix([
            [2, 3, 4, 2],
            [5, 6, 7, 1],
            [8, 9, 7, 0],
            [2, 6, 3, 5]
        ]));

        const dSolved = d.solve();

        expect(dSolved.constant).toBeDefined();
        if(dSolved.constant) {
            expect(dSolved.constant.value).toBe(-45);
        }
    });
    
    it("Case 5x5", () => {
        const d = Matrix.computeDeterminant(new Matrix([
            [2, 3, 4, 2, -3],
            [5, 6, 7, 1, 5],
            [8, 9, 7, 0, 2],
            [2, 6, 3, 5, 1],
            [7, -6, 8, 4, 3]
        ]));

        const dSolved = d.solve();

        expect(dSolved.constant).toBeDefined();
        if(dSolved.constant) {
            expect(dSolved.constant.value).toBe(-10137);
        }
    });

    it("Case 6x6", () => {
        const d = Matrix.computeDeterminant(new Matrix([
            [2, 3, 4, 2, -3, 1],
            [5, 6, 7, 1, 5, 6],
            [8, 9, 7, 0, 2, 4],
            [2, 6, 3, 5, 1, -2],
            [7, -6, 8, 4, 3, 0],
            [1, 4, -5, -8, 0, 3]
        ]));

        const dSolved = d.solve();

        expect(dSolved.constant).toBeDefined();
        if(dSolved.constant) {
            expect(dSolved.constant.value).toBe(-14038);
        }
    });
});

