import Add from "./Add/Add";
import Multiply from "./Multiply/Multiply";
import Constant from "./Constant/Constant";
import MathObj from "./MathObj/MathObj";
import Subtract from "./Subtract/Subtract";
import Parenthesis from "./Parenthesis/Parenthesis";

const isNumber = (n: string) => !isNaN(Number(n));

const isInParenthesis = (expression: string) => {
    const exp = expression.trim();
    const first = exp[0];
    const last = exp[exp.length - 1];
    return first === "(" && last === ")";
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

export const parseParenthesis = (exp: string) => {
    if(isInParenthesis(exp)) {
        const parenthesisContent = getParenthesisContent(exp);
        return new Parenthesis(parse(parenthesisContent));
    }

    return parse(exp);
};

export const parse: (expression: string) => MathObj = (expression: string) => {
    const symbols = expression.split("").filter((c)=>c !== " ");


    let lowestPriority = 3;
    let lastLowestPriorityIndex = -1;

    let depth = 0;
    
    for(let i = 0; i < symbols.length; i++) {
        const char = symbols[i];

        if(char === "(") {
            depth++;
        }
        if(char === ")") {
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
        if(i === 0 && char === "-") {
            continue;
        }

        if(isOperator(char)) {
            const operatorPriority = getOperatorPriority(char);
            if(operatorPriority <= lowestPriority) {
                lowestPriority = operatorPriority;
                lastLowestPriorityIndex = i;
            }
        }  
    }

    const operator = symbols[lastLowestPriorityIndex];
    const left = symbols.slice(0, lastLowestPriorityIndex).join("");
    const right = symbols.slice(lastLowestPriorityIndex + 1, symbols.length).join("");
    
    
    const leftMath = isNumber(left)
        ? new Constant(parseFloat(left))
        : parseParenthesis(left);
    
    const rightMath = isNumber(right) 
        ? new Constant(parseFloat(right))
        : parseParenthesis(right);

    if(operator === "+") {
        return new Add(leftMath, rightMath);
    } else if(operator === "-") {
        return new Subtract(leftMath, rightMath);
    } else if(operator === "*") {
        return new Multiply(leftMath, rightMath);
    } else if(operator === "/") {
        // TODO next
    }

    return new Add(new Constant(0), new Constant(0));
};

const mathObj1 = parse("2 + (3 - 4)");
console.log(mathObj1);
console.log(mathObj1.toTex());