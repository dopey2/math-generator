import Fraction from "../../math/Operation/Fraction/Fraction";
import Constant from "../../math/Operation/Constant/Constant";
import Add from "../../math/Operation/Add/Add";
import MathObj from "../../math/Operation/MathObj/MathObj";
import Multiply from "../../math/Operation/Multiply/Multiply";
import Subtract from "../../math/Operation/Subtract/Subtract";

// @ts-ignore
const fraction0 = new Fraction(new Constant(4), new Constant(5)) as MathObj;

const fraction1 = new Add(
    // @ts-ignore
    new Fraction(new Constant(7), new Constant(3)) as MathObj,
    // @ts-ignore
    new Fraction(new Constant(4), new Constant(6)) as MathObj
);

const fraction2 = new Fraction(
    // @ts-ignore
    new Add(new Constant(3), new Constant(7)) as MathObj,
    // @ts-ignore
    new Add(new Constant(2), new Constant(3)) as MathObj
);

const fraction3 = new Fraction(
    // @ts-ignore
    new Multiply(new Constant(2), new Constant(9)) as MathObj,
    // @ts-ignore
    new Multiply(new Constant(2), new Constant(3)) as MathObj
);

const fraction4 = new Subtract(
    // @ts-ignore
    new Fraction(new Constant(12), new Constant(4)) as MathObj,
    // @ts-ignore
    new Fraction(new Constant(3), new Constant(6)) as MathObj
) as MathObj;


const fraction5 = new Multiply(
    // @ts-ignore
    new Fraction(new Constant(9), new Constant(2)) as MathObj,
    // @ts-ignore
    new Fraction(new Constant(4), new Constant(3)) as MathObj
) as MathObj;

const fraction6 = new Multiply(
    new Fraction(new Constant(5), new Constant(4)) as MathObj,
    new Constant(3)
) as MathObj;

const fraction7 = new Multiply(
    new Fraction(new Constant(5), new Constant(4)) as MathObj,
    new Fraction(new Constant(3), new Constant(1)) as MathObj
) as MathObj;


const add1 = new Add(new Constant(-5), new Constant(-3));
const subtract1 = new Subtract(new Constant(5), new Constant(-3));


const fraction8 = new Fraction(
    new Subtract(new Constant(-2), new Constant(-8)),
    new Subtract(new Constant(3), new Constant(5))
);

// TODO THIS ONE
const multiplyFraction = new Multiply(new Constant(2), fraction8);


export const expressionsList: MathObj[] = [
    multiplyFraction,
    add1,
    subtract1,
    fraction0, // 4/5
    fraction1, // 18/6 => 3
    fraction2, // 10/5 => 2
    fraction3, // 18/6 => 3
    fraction4, // 30/12
    fraction5, // 36/6 => 6
    fraction6, // 15/2
    fraction7
];