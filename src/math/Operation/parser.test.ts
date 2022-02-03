import { parse } from "./parser";

describe("Math parser",() => {

    it("0 + 0", () => {
        const expression = parse("0 + 0");
        const res = expression.solve();
        expect(expression.toTex()).toBe("0 + 0");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(0);
    });

    it("2 + 3", () => {
        const expression = parse("2 + 3");
        const res = expression.solve();
        expect(expression.toTex()).toBe("2 + 3");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(5);
    });

    it("-2 + 6", () => {
        const expression = parse("-2 + 6");
        const res = expression.solve();
        expect(expression.toTex()).toBe("-2 + 6");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(4);
    });

    it("2 * 3", () => {
        const expression = parse("2 * 3");
        const res = expression.solve();
        expect(expression.toTex()).toBe("2 * 3");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(6);
    });

    it("-2 * 3", () => {
        const expression = parse("-2 * 3");
        const res = expression.solve();
        expect(expression.toTex()).toBe("-2 * 3");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(-6);
    });

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

    it("-2 + 5", () => {
        const expression = parse("-2 + 5");
        const res = expression.solve();
        expect(expression.toTex()).toBe("-2 + 5");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(3);
    });

    it("-2 + 3 * 4", () => {
        const expression = parse("-2 + 3 * 4");
        const res = expression.solve();
        expect(expression.toTex()).toBe("-2 + 3 * 4");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(10);
    });

    it("-2 * 3 + 4", () => {
        const expression = parse("-2 * 3 + 4");
        const res = expression.solve();
        expect(expression.toTex()).toBe("-2 * 3 + 4");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(-2);
    });

    it("2 * (3 + 4)", () => {
        const expression = parse("2 * (3 + 4)");
        const res = expression.solve();
        expect(expression.toTex()).toBe("2 * (3 + 4)");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(14);
    });

    it("2 * (3 - 4)", () => {
        const expression = parse("2 * (3 - 4)");
        const res = expression.solve();
        expect(expression.toTex()).toBe("2 * (3 - 4)");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(-2);
    });

    it("2 + (3 - 4)", () => {
        const expression = parse("2 + (3 - 4)");
        const res = expression.solve();
        expect(expression.toTex()).toBe("2 + (3 - 4)");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(1);
    });

    it("10 - (2 * 3)", () => {
        const expression = parse("10 - (2 * 3)");
        const res = expression.solve();
        expect(expression.toTex()).toBe("10 - (2 * 3)");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(4);
    });


    it("-10 - (2 * 3)", () => {
        const expression = parse("-10 - (2 * 3)");
        const res = expression.solve();
        expect(expression.toTex()).toBe("-10 - (2 * 3)");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(-16);
    });

    it("-10 - (2 * 3) + 5", () => {
        const expression = parse("-10 - (2 * 3) + 5");
        const res = expression.solve();
        expect(expression.toTex()).toBe("-10 - (2 * 3) + 5");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(-11);
    });


    it("(2 + 3) * (4 + 5)", () => {
        const expression = parse("(2 + 3) * (4 + 5)");
        const res = expression.solve();
        expect(expression.toTex()).toBe("(2 + 3) * (4 + 5)");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(45);
    });


    it("(2 * 3) + (4 * 5)", () => {
        const expression = parse("(2 * 3) + (4 * 5)");
        const res = expression.solve();
        expect(expression.toTex()).toBe("(2 * 3) + (4 * 5)");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(26);
    });

    it("(2 * 3) - (4 * 5)", () => {
        const expression = parse("(2 * 3) - (4 * 5)");
        const res = expression.solve();
        expect(expression.toTex()).toBe("(2 * 3) - (4 * 5)");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(-14);
    });

    it("(3 + (2 * 3)) * 2", () => {
        const expression = parse("(3 + (2 * 3)) * 2");
        const res = expression.solve();
        expect(expression.toTex()).toBe("(3 + (2 * 3)) * 2");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(18);
    });


    it("(3 + (2 * 3)) * 2 + 2", () => {
        const expression = parse("(3 + (2 * 3)) * 2 + 2");
        const res = expression.solve();
        expect(expression.toTex()).toBe("(3 + (2 * 3)) * 2 + 2");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(20);
    });


    it("(3 + (2 * 3)) * 2 - (4 + 5)", () => {
        const expression = parse("(3 + (2 * 3)) * 2 - (4 + 5)");
        const res = expression.solve();
        expect(expression.toTex()).toBe("(3 + (2 * 3)) * 2 - (4 + 5)");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(9);
    });

    it("(3 + (2 * 3)) * 2 - (4 + 5) * 2", () => {
        const expression = parse("(3 + (2 * 3)) * 2 - (4 + 5) * 2");
        const res = expression.solve();
        expect(expression.toTex()).toBe("(3 + (2 * 3)) * 2 - (4 + 5) * 2");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(0);
    });


    it("(3 + (2 * 3)) * 2 - (4 + 5) * 2", () => {
        const expression = parse("(3 + (2 * 3)) * 2 - (4 + 5) * 2");
        const res = expression.solve();
        expect(expression.toTex()).toBe("(3 + (2 * 3)) * 2 - (4 + 5) * 2");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(0);
    });
    
});


describe("Math parser, exponents", () => {
    it("2 ^ 3", () => {
        const expression = parse("2 ^ 3");
        const res = expression.solve();
        expect(expression.toTex()).toBe("2^{3}");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(8);
    });

    it("2 ^{3}", () => {
        const expression = parse("2^{3}");
        const res = expression.solve();
        expect(expression.toTex()).toBe("2^{3}");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(8);
    });

    it("2 ^{2 + 2}", () => {
        const expression = parse("2^{2 + 2}");
        const res = expression.solve();
        expect(expression.toTex()).toBe("2^{2 + 2}");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(16);
    });

    it("4 * 3 ^ 2", () => {
        const expression = parse("4 * 3 ^ 2");
        const res = expression.solve();
        expect(expression.toTex()).toBe("4 * 3^{2}");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(36);
    });

    it("(4 * 3)^ 2", () => {
        const expression = parse("(4 * 3) ^ 2");
        const res = expression.solve();
        expect(expression.toTex()).toBe("(4 * 3)^{2}");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(144);
    });

    it("(1 + 3)^ 2 * 3 ", () => {
        const expression = parse("(1 + 3) ^ 2 * 3");
        const res = expression.solve();
        expect(expression.toTex()).toBe("(1 + 3)^{2} * 3");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(48);
    });

    it("(1 + 3)^{2 * 3} ", () => {
        const expression = parse("(1 + 3) ^{2 * 3}");
        const res = expression.solve();
        expect(expression.toTex()).toBe("(1 + 3)^{2 * 3}");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(4096);
    });

    it("5^0", () => {
        const expression = parse("5^0");
        const res = expression.solve();
        expect(expression.toTex()).toBe("5^{0}");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(1);
    });
});


describe("Math parser, edge case", () => {
    it("3 + -2", () => {
        const n = -2;
        const expression = parse(`3 + ${n}`);
        const res = expression.solve();
        expect(expression.toTex()).toBe("3 - 2");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(1);
    });

    it("3 * -2", () => {
        const n = -2;
        const expression = parse(`3 * ${n}`);
        const res = expression.solve();
        expect(expression.toTex()).toBe("3 * (-2)");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(-6);
    });

    it("3 - -2", () => {
        const n = -2;
        const expression = parse(`3 - ${n}`);
        const res = expression.solve();
        expect(expression.toTex()).toBe("3 - (-2)");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(5);
    });

    it("-0 + 0", () => {
        const expression = parse("-0 + 0");
        const res = expression.solve();
        expect(expression.toTex()).toBe("0 + 0");
        expect(res).toBeDefined();
        expect(res.constant?.value).toBe(0);
    });

});
