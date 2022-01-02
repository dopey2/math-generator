import { toMultilineLatex } from "./utils";

export interface VisualRepresentationI {
    type: "latex" | "canvas" | "html" | "custom",
    latex?: string;
    canvas?: any;
    html?: string;
    component?: any;
    props?: any;
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
        this.output.question.push({ type: "latex", latex: toMultilineLatex(args) });
        return this;
    }

    addCustomQuestion(component: any, props: any) {
        this.output.question.push({ type: 'custom', component, props });
        return this;
    }

    addQuestionHtml(...args: any) {
        this.output.question.push({ type: 'html', html: args });
        return this;
    }

    addAnswerLatex(...args: any) {
        this.output.answer.push({ type: "latex", latex: toMultilineLatex(args) });
        return this;
    }

    addAnswerHtml(...args: any) {
        this.output.answer.push({ type: "html", html: args });
        return this;
    }

    addStepAnswerLatex(...args: any) {
        if (!this.output.stepAnswer) {
            this.output.stepAnswer = [];
        }
        this.output.stepAnswer.push({ type: "latex", latex: toMultilineLatex(args) });
        return this;
    }

    toJSON() {
        return this.output as ExerciseI;
    }
}
