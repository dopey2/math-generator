import { Add } from "../../../math/Operations/Add";
import { Parenthesis } from "../../../math/Operations/Parenthesis";
import { Operand, parseObj } from "../../../math/Operations/Operand";
import { Multiply } from "../../../math/Operations/Multiply";

describe("TESTING PARSING METHOD FOR DEVELOPMENT EXERCISES", () => {
    it("Correct case 1", () => {
        expect(parseObj("123x^25")).toEqual({
            constant: 123,
            unknown: "x",
            exponent: 25,
        });
    });
    it("Correct case 2", () => {
        expect(parseObj("3x")).toEqual({
            constant: 3,
            unknown: "x",
            exponent: null,
        });
    });
    it("Correct case 3", () => {
        expect(parseObj("x^13")).toEqual({
            constant: null,
            unknown: "x",
            exponent: 13,
        });
    });
    it("Correct case 4", () => {
        expect(parseObj("x")).toEqual({
            constant: null,
            unknown: "x",
            exponent: null,
        });
    });
    it("Correct case 5", () => {
        expect(parseObj("7")).toEqual({
            constant: 7,
            unknown: "",
            exponent: null,
        });
    });

    it("Correct case 6", () => {
        expect(parseObj("-5")).toEqual({
            constant: -5,
            unknown: "",
            exponent: null,
        });
    });

    it("Correct case 7", () => {
        expect(parseObj("-12x")).toEqual({
            constant: -12,
            unknown: "x",
            exponent: null,
        });
    });

    it("Correct case 8", () => {
        expect(parseObj("-12x^3")).toEqual({
            constant: -12,
            unknown: "x",
            exponent: 3,
        });
    });

    it("Correct case 9", () => {
        expect(parseObj("0")).toEqual({
            constant: 0,
            unknown: "",
            exponent: null,
        });
    });
});

describe("ARITHMETIC SIMPLE ADDITIONS", () => {
    const A = new Operand('7');
    const B = new Operand('15');
    const C = new Operand('x');

    it("7 + 15", () => {
        const expr1 = new Add(A, B);
        expect(expr1.toString()).toBe('7 + 15');
        expect(expr1.solve().toString()).toBe('22');
    });


    it("7 + x", () => {
        const expr1 = new Add(A, C);
        expect(expr1.toString()).toBe('7 + x');
        expect(expr1.solve().toString()).toBe('7 + x');
    });
});

describe("ARITHMETIC SIMPLE ADDITIONS", () => {
    const A = new Operand('2x^2');
    const B = new Operand('3x^2');
    const C = new Operand('4x^2');

    it("7 + 15", () => {
        const expr1 = new Add(A, B, C);
        expect(expr1.toString()).toBe('2x^2 + 3x^2 + 4x^2');
        // @ts-ignore
        expect(expr1.solve().toString()).toBe('9x^2');
    });
});

describe("ARITHMETIC UNKNOWN ADDITIONS", () => {
    const A = new Operand('3x^2');
    const B = new Operand('5x^2');
    const C = new Operand('4x^2');
    const D = new Operand('2x^2');

    it("3x^2 + 5x^2", () => {
        const expr = new Add(A, B);
        expect(expr.toString()).toBe('3x^2 + 5x^2');
        expect(expr.solve().toString()).toBe('8x^2');
    });


    it("3x^2 + (5x^2 + 4x^2 + 2x^2)", () => {
        const expr1 = new Add(A, new Parenthesis(new Add(B, new Add(C, D))));
        const expr2 = expr1.solve();
        const expr3 = expr2.solve();
        const expr4 = expr3.solve();

        expect(expr1.toString()).toBe('3x^2 + (5x^2 + 4x^2 + 2x^2)');
        expect(expr2.toString()).toBe('3x^2 + (5x^2 + 6x^2)');
        expect(expr3.toString()).toBe('3x^2 + 11x^2');
        expect(expr4.toString()).toBe('14x^2');
    });
});

describe("ARITHMETIC SIMPLE MULTIPLICATION", () => {
    const A = new Operand('3');
    const B = new Operand('5');
    const C = new Operand('1');
    const D = new Operand('0');
    const E = new Operand('-3');
    const F = new Operand('-2');

    // it(`3 * 5`, () => {
    //     const expr = new Multiply(A, B);
    //     expect(expr.toString()).toBe(`3 * 5`);
    //     expect(expr.solve().toString()).toBe(`15`);
    // });
    //
    // it(`3 * 1`, () => {
    //     const expr = new Multiply(A, C);
    //     expect(expr.toString()).toBe(`3 * 1`);
    //     expect(expr.solve().toString()).toBe(`3`);
    // });
    //
    // it(`3 * 0`, () => {
    //     const expr = new Multiply(A, D);
    //     expect(expr.toString()).toBe(`3 * 0`);
    //     expect(expr.solve().toString()).toBe(`0`);
    // });
    //
    // it(`3 * -3`, () => {
    //     const expr = new Multiply(A, E);
    //     expect(expr.toString()).toBe(`3 * -3`);
    //     expect(expr.solve().toString()).toBe(`-9`);
    // });

    // it(`(-3) * (-2)`, () => {
    //     const expr = new Multiply(E, F);
    //     expect(expr.toString()).toBe(`(-3) * (-2)`);
    //     expect(expr.solve().toString()).toBe(`6`);
    // });
});

//
// describe("ARITHMETIC UNKNOWN MULTIPLICATION", () => {
//     const A = new Operand('3x');
//     const B = new Operand('2x');
//     const C = new Operand('4x^2');
//     const D = new Operand('5x^2');
//     const E = new Operand('2x^3');
//     const F = new Operand('-2x');
//
//     it(`3x * 2x`, () => {
//         const expr = new Multiply(A, B);
//         expect(expr.toString()).toBe(`3x * 2x`);
//         expect(expr.solve().toString()).toBe(`6x^2`);
//     });
//
//     it(`3x * 4x^2`, () => {
//         const expr = new Multiply(A, C);
//         expect(expr.toString()).toBe(`3x * 4x^2`);
//         expect(expr.solve().toString()).toBe(`12^3`);
//     });
//
//     it(`4x^2 * 5^2`, () => {
//         const expr = new Multiply(C, D);
//         expect(expr.toString()).toBe(`4x^2 * 5^2`);
//         expect(expr.solve().toString()).toBe(`20x^4`);
//     });
//
//     it(`5x^2 * 2x^3`, () => {
//         const expr = new Multiply(D, E);
//         expect(expr.toString()).toBe(`5x^2 * 2x^3`);
//         expect(expr.solve().toString()).toBe(`10x^5`);
//     });
//
//     it(`2x^3 * -2x`, () => {
//         const expr = new Multiply(E, F);
//         expect(expr.toString()).toBe(`2x^3 * -2x`);
//         expect(expr.solve().toString()).toBe(`-4x^4`);
//     });
// });
//
