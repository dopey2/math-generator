import Add from "./Add/Add";
import Multiply from "./Multiply/Multiply";
import Constant from "./Constant/Constant";
import MathObj from "./MathObj/MathObj";
import Subtract from "./Subtract/Subtract";
import Parenthesis from "./Parenthesis/Parenthesis";
import Fraction from "./Fraction/Fraction";
import Exponent from "./Exponent/Exponent";

const isNumber = (n: string) => !isNaN(Number(n));

const isInParenthesis = (expression: string) => {
    const exp = expression.trim();
    const first = exp[0];
    const last = exp[exp.length - 1];
    return first === "(" && last === ")";
};

const isInBracket = (expression: string) => {
    const exp = expression.trim();
    const first = exp[0];
    const last = exp[exp.length - 1];
    return first === "{" && last === "}";
};

const getParenthesisContent = (expression: string) => {
    return expression.slice(1, expression.length - 1);
};

const isOperator = (c: string) => {
    return ["+", "-", "*", "/", "^"].indexOf(c) !== -1;
};

const getOperatorPriority = (operator: string) => {
    if(operator === "+" || operator === "-") {
        return 1;
    } if(operator === "*" || operator === "/") {
        return 2;
    } if(operator === "^") {
        return 3;
    }
    return 0;
};

const parseParenthesisAndBracket = (exp: string) => {
    if(isInParenthesis(exp)) {
        const content = getParenthesisContent(exp);
        return new Parenthesis(parse(content));
    }
    
    if(isInBracket(exp)) {
        const content = getParenthesisContent(exp);
        return parse(content);
    }

    return parse(exp);
};

/**
 * Return the index of the last operator with the lowest priority
 * The function read each character from left to right
 * Ex. ["2", "+", "6", "-", "3", "*" "2"]
 * The last lowest priority operator is "-" so
 * @param symbols string[]
 */
const findLastLowestPriorityOperator = (symbols: string[]) => {
    let lowestPriority = 3;
    let lastLowestPriorityIndex = -1;

    let depth = 0;

    for(let i = 0; i < symbols.length; i++) {
        const char = symbols[i];

        if(char === "(" || char === "{") {
            depth++;
        }
        if(char === ")" || char === "}") {
            depth--;
        }

        /**
         * Ignore the operators in the parenthesis since they are parsed later
         */
        if(depth > 0) {
            continue;
        }

        /**
         * Ignore the negative signe which comes from negative numbers ex: Add(-5,3)
         */
        if(char === "-") {
            const prevChar = symbols[i - 1];
            if(prevChar === undefined) {
                continue;
            }
            if(isOperator(prevChar)) {
                continue;
            }
        }

        if(isOperator(char)) {
            const operatorPriority = getOperatorPriority(char);
            if(operatorPriority <= lowestPriority) {
                lowestPriority = operatorPriority;
                lastLowestPriorityIndex = i;
            }
        }
    }

    return lastLowestPriorityIndex;
};

export const parse: (expression: string) => MathObj = (expression: string) => {
    if(isNumber(expression)) {
        return new Constant(parseFloat(expression));
    }

    const symbols = expression.split("").filter((c)=>c !== " ");
    const lastLowestPriorityIndex = findLastLowestPriorityOperator(symbols);

    const operator = symbols[lastLowestPriorityIndex];
    const leftString = symbols.slice(0, lastLowestPriorityIndex).join("");
    const rightString = symbols.slice(lastLowestPriorityIndex + 1, symbols.length).join("");

    const left = parseParenthesisAndBracket(leftString);
    const right = parseParenthesisAndBracket(rightString);

    return createMathObj(operator, left, right);
};

const createMathObj = (operator: string, left: MathObj, right: MathObj) => {
    if(operator === "+") {
        return new Add(left, right);
    } else if(operator === "-") {
        return new Subtract(left, right);
    } else if(operator === "*") {
        return new Multiply(left, right);
    } else if(operator === "/") {
        return new Fraction(left, right);
    } else if(operator === "^") {
        return new Exponent(left, right);
    }

    return new Add(new Constant(0), new Constant(0));
};
