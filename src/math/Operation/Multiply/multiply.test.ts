import Constant from "../Constant/Constant";
import Multiply from "./Multiply";

describe("Adding constant", () => {
    it("1 * 1", () => {
        const expression = new Multiply(new Constant(1), new Constant(1));
        const solved = expression.next();
        expect(solved).toBeDefined();
        expect(solved?.atomic).toBe(true);
        expect(solved?.constant).toBeDefined();
        expect(solved?.constant?.value).toBe(1);
        expect(solved?.toString()).toBe("1");
    });

    it("3 * 2", () => {
        const expression = new Multiply(new Constant(3), new Constant(2));
        const solved = expression.next();

        expect(solved).toBeDefined();
        expect(solved?.atomic).toBe(true);
        expect(solved?.constant).toBeDefined();
        expect(solved?.constant?.value).toBe(6);
        expect(solved?.toString()).toBe("6");
    });
});