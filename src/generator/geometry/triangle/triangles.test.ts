import { times } from "../../utils";
import { randomTriangleLength } from "./triangles";

describe("TRIANGLE LENGTH GENERATOR", () => {
    const data: Array<Array<number>> = [];
    times(10, () => data.push(randomTriangleLength()));
    data.forEach((length) => {
        const [A, B, C] = length;
        it("A + B > C", () => {
            expect(A + B).toBeGreaterThan(C);
        });
        it("B + C > A", () => {
            expect(B + C).toBeGreaterThan(A);
        });
        it("A + C > B", () => {
            expect(A + C).toBeGreaterThan(B);
        });
    });
});