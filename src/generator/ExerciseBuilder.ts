import React from "react";
import Tex from "../math/Tex";

export interface VisualRepresentationI {
    type: "latex" | "canvas" | "html" | "custom" | "row" | "latex-text",
    latex?: string;
    canvas?: any;
    html?: string;
    custom?: {
        component: any;
        props?: any;
    }
    row: VisualRepresentationI[]
    latexText?: string;
}

export interface ExerciseI {
    question: VisualRepresentationI[];
    answer: VisualRepresentationI[];
    stepAnswer?: VisualRepresentationI[];
    inlineAnswer?: boolean
}

export default class ExerciseBuilder {
    output: any = {
        question: [],
        answer: [],
        inlineAnswer: false,
    };

    addQuestionLatexText(text: string) {
        this.output.question.push({ type: "latex-text", latexText: text });
        return this;
    }

    addQuestionLatex(...args: any) {
        this.output.question.push({ type: "latex", latex: Tex.toMultilineLatex(args) });
        return this;
    }

    addCustomQuestion<C extends typeof React.Component>(component: C, props: React.ComponentProps<C>) {
        this.output.question.push({
            type: 'custom',
            custom: { component, props },
        });
        return this;
    }

    addQuestionHtml(...args: any) {
        this.output.question.push({ type: 'html', html: args });
        return this;
    }

    inlineAnswer() {
        this.output.inlineAnswer = true;
        return this;
    }

    addAnswerLatex(...args: any) {
        this.output.answer.push({ type: "latex", latex: Tex.toMultilineLatex(args) });
        return this;
    }

    addAnswerHtml(...args: any) {
        this.output.answer.push({ type: "html", html: args });
        return this;
    }

    addCustomAnswer<C extends typeof React.Component>(component: C, props: React.ComponentProps<C>) {
        this.output.answer.push({
            type: 'custom',
            custom: { component, props },
        });
        return this;
    }

    addStepAnswerLatex(...args: any) {
        if (!this.output.stepAnswer) {
            this.output.stepAnswer = [];
        }
        this.output.stepAnswer.push({ type: "latex", latex: Tex.toMultilineLatex(args) });
        return this;
    }

    toJSON() {
        return this.output as ExerciseI;
    }
}
