import React from 'react';

import MathObj from "../../math/Operation/MathObj/MathObj";
import { expressionsList } from "./expressionsList";
import KatexComponent from "../../component/Katex.component";

interface State {
    expressions: MathObj[];
    lastStep: MathObj;
    selected: number
    steps: string[];
}

export default class DraftOperationPage extends React.PureComponent<any, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            // @ts-ignore
            expressions: expressionsList,
            // @ts-ignore
            lastStep: expressionsList[0],
            selected: 0,
            steps: [expressionsList[0].toTex()],
        };

    }


    solveNext = () => {
        const lastStep = this.state.lastStep.next();

        if (this.state.lastStep.atomic) {
            return;
        }

        const latex = lastStep.toTex();

        this.setState((prevState: State) => {
            return {
                steps: [...prevState.steps, latex],
                lastStep,
            };
        });
    };

    solveAll = () => {
        const steps = this.state.expressions[this.state.selected].solveAllToTex();
        this.setState({ steps });
    };

    prevExpression = () => {
        // @ts-ignore
        this.setState((prevState) => {
            const selected = Math.max(0, prevState.selected - 1);

            return {
                selected,
                lastStep: expressionsList[selected],
                steps: [expressionsList[selected].toTex()],
            };
        });
    };


    nextExpression = () => {
        // @ts-ignore
        this.setState((prevState) => {

            const selected = Math.min(this.state.expressions.length - 1, prevState.selected + 1);

            return {
                selected,
                lastStep: expressionsList[selected],
                steps: [expressionsList[selected].toTex()],
            };
        });
    };

    render() {

        return (
            <div className={"flex flex-col f1 w-full h-full items-center pb-8"}>
                <div className="flex flex-row">
                    <button onClick={this.prevExpression}>Prev</button>
                    <button onClick={this.nextExpression}>Next</button>
                </div>

                {this.state.steps.map((s) => {
                    return <KatexComponent tex={s} />;
                })}

                <button onClick={this.solveNext}>Test function</button>
                <button onClick={this.solveAll}>Solve all</button>
            </div>
        );
    }
}