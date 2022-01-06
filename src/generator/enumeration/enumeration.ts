import MathX from "../../math/MathX/MathX";
import ExerciseBuilder from "../ExerciseBuilder";


/**
 * Permutation avec remise
 */
export const enumerationLocker = () => {

    const n = MathX.random(4, 10);
    const k = MathX.random(3, 8);

    const expression = `Un cadenas possède un code à ${k} chiffres. Chacun des chiffre pouvant être un nombre de 0 à ${n - 1}. Combien y-a-t-il de codes possibles ?`;

    let answer = `${n}^{${k}} = ${n}`;
    for(let i = 0; i < k - 1; i++) {
        answer += ` * ${n}`;
    }

    answer += ` = ${n ** k}`;

    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addAnswerHtml(expression)
        .addAnswerLatex(answer)
        .toJSON();
};

/**
 * Permutation avec remise
 */
export const enumerationDigitCode = () => {

    const n = MathX.random(4, 10);
    const k = MathX.random(3, 8);
    const y = MathX.random(2, 5, [n]);
    const z = MathX.random(1, 2);

    const expression = `La porte d'un imeuble est protégé par un digit-code composé ${k} chiffres suivi de ${z} lettres. Chacun des chiffres est compris entre 0-${n - 1} et chacune des lettres  entre ${String.fromCharCode(65)}-${String.fromCharCode(65 + y - 1)} . Combien y-a-t-il de codes possibles ?`;

    let answer = `${n}^{${k}} * ${y}^{${z}} = ${n}`;
    for(let i = 0; i < k - 1; i++) {
        answer += ` * ${n}`;
    }

    for(let i = 0; i < z; i++) {
        answer += ` * ${y}`;
    }

    answer += ` = ${n ** k * y ** z}`;

    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addAnswerHtml(expression)
        .addAnswerLatex(answer)
        .toJSON();
};

export const enumerationPinCode = () => {
    const n = MathX.random(4, 10);
    const m = MathX.random(3, 8);
    const expression = `Un code pin est composé des chiffres de 0 à ${n - 1}. Combien y a-t-il de mélange possible avec ${m} chiffres ?`;


    let answer = `${n}^{${m}} = ${n}`;
    for(let i = 0; i < m - 1; i++) {
        answer += ` * ${n}`;
    }

    answer += ` = ${n ** m}`;

    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addAnswerHtml(expression)
        .addAnswerLatex(answer)
        .toJSON();
};


// TODO Permutation

// TODO Combination without repetition

// TODO Combination with repetition

