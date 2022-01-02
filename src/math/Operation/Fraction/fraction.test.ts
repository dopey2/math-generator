import Constant from "../Constant/Constant";
import Fraction from "./Fraction";
import Add from "../Add/Add";
import MathObj from "../MathObj/MathObj";

describe("Fraction with constant", () => {
    it("6 / 3", () => {
        const expression = new Fraction(new Constant(6) as MathObj, new Constant(3) as MathObj);

        const solved = expression.next();
        expect(solved).toBeDefined();
        expect(solved?.atomic).toBe(true);
        expect(solved?.constant).toBeDefined();
        expect(solved?.constant?.value).toBe(2);
        expect(solved?.toString()).toBe("2");
    });
});

describe("Fraction with operations", () => {
    it("(3 + 5) / (1 + 1)", () => {

        const add3And5 = new Add(new Constant(3) as MathObj, new Constant(5) as MathObj) as MathObj;
        const add1And1 = new Add(new Constant(1) as MathObj, new Constant(1) as MathObj) as MathObj;
        const expression = new Fraction(add3And5, add1And1);

        const newFraction = expression.next();
        expect(newFraction).toBeDefined();
        expect(newFraction?.atomic).toBe(false);
        expect(newFraction?.fraction).toBeDefined();
        expect(newFraction?.fraction?.d.constant).toBeDefined();
        expect(newFraction?.fraction?.n.constant).toBeDefined();
        expect(newFraction?.fraction?.n.constant?.value).toBe(8);
        expect(newFraction?.fraction?.d.constant?.value).toBe(2);

        const solved = newFraction.next();

        expect(solved).toBeDefined();
        expect(solved?.atomic).toBe(true);
        expect(solved?.constant).toBeDefined();
        expect(solved?.constant?.value).toBe(4);
        expect(solved?.toString()).toBe("4");
    });
});