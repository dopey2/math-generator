import MathX from "./MathX";

const approxeq = (x1: number, x2: number, epsilon = 0.01) => Math.abs(x1 - x2) <= epsilon;

describe("MathX", () => {
  it("getQuadrantForPoint", () => {
    expect(MathX.getQuadrantForPoint(1, 1)).toBe(1);
    expect(MathX.getQuadrantForPoint(-1, 1)).toBe(2);
    expect(MathX.getQuadrantForPoint(-1, -1)).toBe(3);
    expect(MathX.getQuadrantForPoint(1, -1)).toBe(4);
  });

  it("cartesianToPolar (3, 4) => (3, 53.13°)", () => {
    const [l, d] = MathX.cartesianToPolar(3, 4);
    expect(l).toBe(5);
    expect(approxeq(d, 53.13)).toBe(true);
    expect(d.toFixed(2)).toBe("53.13");
  });

  it("cartesianToPolar (7, 5) => (8.60, 35.53°)", () => {
    const [l, d] = MathX.cartesianToPolar(7, 5);
    expect(approxeq(l, 8.60)).toBe(true);
    expect(approxeq(d, 35.53)).toBe(true);
  });

  it("cartesianToPolar (-2, 4) => (4.47, 116.56°)", () => {
    const [l, d] = MathX.cartesianToPolar(-2, 4);
    expect(approxeq(l, 4.47)).toBe(true);
    expect(approxeq(d, 116.56)).toBe(true);
  });

  it("cartesianToPolar (-5, -3.5) => (6.10, -145.00°)", () => {
    const [l, d] = MathX.cartesianToPolar(-5, -3.5);
    expect(approxeq(l, 6.10)).toBe(true);
    expect(approxeq(d, 215.00)).toBe(true);
  });

  it("cartesianToPolar (4.6, -3) => (5.49, 326.88°)", () => {
    const [l, d] = MathX.cartesianToPolar(4.6, -3);
    expect(approxeq(l, 5.49)).toBe(true);
    expect(approxeq(d, 326.88)).toBe(true);
  });

  it("polarToCartesian (5, 60°) => (2.5, 4.33)", () => {
    const [x, y] = MathX.polarToCartesian(5, 60);
    expect(approxeq(x, 2.5)).toBe(true);
    expect(approxeq(y, 4.33)).toBe(true);
  });

  it("polarToCartesian (4, 130°) => (-2.57, 3.06)", () => {
    const [x, y] = MathX.polarToCartesian(4, 130);
    expect(approxeq(x, -2.57)).toBe(true);
    expect(approxeq(y, 3.06)).toBe(true);
  });

  it("polarToCartesian (5, 210°) => (-4.33, -2.5)", () => {
    const [x, y] = MathX.polarToCartesian(5, 210);
    expect(approxeq(x, -4.33)).toBe(true);
    expect(approxeq(y, -2.5)).toBe(true);
  });

  it("polarToCartesian (8, 315°) => (5.65, -5.65)", () => {
    const [x, y] = MathX.polarToCartesian(8, 315);
    expect(approxeq(x, 5.65)).toBe(true);
    expect(approxeq(y, -5.65)).toBe(true);
  });
});