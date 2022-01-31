import { parse } from "./parser";

describe("Math parser",() => {
    it("2 + 3 * 4", () => {
        const expression = parse("2 + 3 * 4");
        const res = expression.solve();
        expect(expression.toTex()).toBe("2 + 3 * 4");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(14);
    });

    it("2 * 3 + 4", () => {
        const expression = parse("2 * 3 + 4");
        const res = expression.solve();
        expect(expression.toTex()).toBe("2 * 3 + 4");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(10);
    });


    it("2 * 3 + 4 * 5", () => {
        const expression = parse("2 * 3 + 4 * 5");
        const res = expression.solve();
        expect(expression.toTex()).toBe("2 * 3 + 4 * 5");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(26);
    });


    it("5 - 4 + 3 * 6 + 10", () => {
        const expression = parse("5 - 4 + 3 * 6 + 10");
        const res = expression.solve();
        expect(expression.toTex()).toBe("5 - 4 + 3 * 6 + 10");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(29);
    });

});