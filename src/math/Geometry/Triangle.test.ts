import Triangle from './Triangle.math';

describe("Triangle SSS", () => {
    it("Test angles sum", () => {
        const triangle = new Triangle(7, 8, 6);
        expect(triangle.getAngleA() + triangle.getAngleB() + triangle.getAngleC()).toBeCloseTo(180, 1)

        const triangle2 = new Triangle(3, 4, 6);
        expect(triangle2.getAngleA() + triangle2.getAngleB() + triangle2.getAngleC()).toBeCloseTo(180, 1)


        const triangle3 = new Triangle(5, 7, 9);
        expect(triangle3.getAngleA() + triangle3.getAngleB() + triangle3.getAngleC()).toBeCloseTo(180, 1)

        const triangle4 = new Triangle(7, 7, 7);
        expect(triangle4.getAngleA() + triangle4.getAngleB() + triangle4.getAngleC()).toBeCloseTo(180, 1)
    })

    it("Test angle", () => {
        const triangle = new Triangle(7, 8, 6);
        expect(triangle.getAngleA()).toBeCloseTo(57.9, 0.5)
        expect(triangle.getAngleB()).toBeCloseTo(75.5, 0.5)
        expect(triangle.getAngleC()).toBeCloseTo(46.5, 0.5)

        const triangle2 = new Triangle(7, 7, 7);
        expect(triangle2.getAngleA()).toBeCloseTo(60, 0.5)
        expect(triangle2.getAngleB()).toBeCloseTo(60, 0.5)
        expect(triangle2.getAngleC()).toBeCloseTo(60, 0.5)

        const triangle3 = new Triangle(3, 4, 5);
        expect(triangle3.getAngleA()).toBeCloseTo(36.8, 0.5)
        expect(triangle3.getAngleB()).toBeCloseTo(53.1, 0.5)
        expect(triangle3.getAngleC()).toBeCloseTo(90, 0.5)
    })
})