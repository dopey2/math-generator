import Add from "./Add/Add";
import Multiply from "./Multiply/Multiply";
import Constant from "./Constant/Constant";
import MathObj from "./MathObj/MathObj";
import Subtract from "./Subtract/Subtract";
import Parenthesis from "./Parenthese/Parenthesis";

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
    
    let depth = 0;
    
    for(let i = 0; i < symbols.length; i++) {
        const char = symbols[i];

        if(char === "(") {
            depth++;
        }
        if(char === ")") {
            depth--;
        }
        
        if(depth === 0 && isOperator(char)) {
            const operatorPriority = getOperatorPriority(char);
            if(operatorPriority <= lowestPriority) {
                lowestPriority = operatorPriority;
            }
        }  
    }

    let nextOperatorIndex = -1;

    for(let i = 0; i < symbols.length; i++) {
        const char = symbols[i];

        if(isOperator(char) && getOperatorPriority(char) === lowestPriority) {
            nextOperatorIndex = i;
        }

    }

    const operator = symbols[nextOperatorIndex];
    const left = symbols.slice(0, nextOperatorIndex).join("");
    const right = symbols.slice(nextOperatorIndex + 1, symbols.length).join("");
    
    
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