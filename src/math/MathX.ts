export default class MathX {

  /**
   * GCD = Greatest common divisor
   * ex: gcd(15, 20) = 25
   */
  static gcd = (a: number, b: number): number => {
    if (a === 0) {
      return b;
    }

    return MathX.gcd(b % a, a);
  };

  static lcm = (a: number, b: number) => {
    return (a * b) / MathX.gcd(a, b);
  };

  static random = (minIncluded: number, maxIncluded: number, excludes?: number[]) => {
    if (!excludes || !excludes.length) {
      return Math.floor(Math.random() * (maxIncluded - minIncluded + 1)) + minIncluded;
    }

    const numbers = [];
    for (let i = minIncluded; i <= maxIncluded; i++) {
      if (!excludes.includes(i)) {
        numbers.push(i);
      }
    }

    const index = Math.floor(Math.random() * (numbers.length));
    return numbers[index];
  };

  static randomValues = (terms: number, min: number, maxNumber: number, excludes?: number[]) => {
    const operands: Array<number> = [];
    for(let i = 0; i < terms; i++) {
      operands.push(MathX.random(min, maxNumber, excludes))
    }
    return operands;
  };

  static getFirstNDividers = (x: number, n: number, exceptOneAndItself = true) => {
    const dividers = [];

    for(let i = 1; dividers.length < n && i <= x; i++) {
      if(exceptOneAndItself) {
        if(i === 1 || i === x) {
          continue;
        }
      }
      x % i === 0 && dividers.push(i);
      i > x && dividers.push(dividers[dividers.length - 1]);
    }

    return dividers;
  }

}