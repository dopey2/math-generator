import React from "react";
import Tex from "../math/Tex";

export interface VisualRepresentationI {
    type: "latex" | "canvas" | "html" | "custom" | "row",
    latex?: string;
    canvas?: any;
    html?: string;
    custom?: {
        component: any;
        props?: any;
    }
    row: VisualRepresentationI[]
}

export interface ExerciseI {
    question: VisualRepresentationI[];
    answer: VisualRepresentationI[];
    stepAnswer?: VisualRepresentationI[];
}

export default class ExerciseBuilder {
    output: any = {
        question: [],
        answer: [],
    };

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
