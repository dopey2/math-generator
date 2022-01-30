import React from 'react';

import { expressionsList } from "./expressionsList";
import ExpressionSolver from './ExpressionSolver.component';

interface State {
    selected: number
}

export default class DraftOperationPage extends React.PureComponent<any, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            selected: 0,
        };

    }

    prevExpression = () => {
        this.setState((prevState) => {
            const selected = Math.max(0, prevState.selected - 1);
            return { selected };
        });
    };


    nextExpression = () => {
        this.setState((prevState) => {
            const selected = Math.min(expressionsList.length - 1, prevState.selected + 1);
            return { selected };
        });
    };

    render() {
        return (
            <div className={"flex flex-col f1 w-full h-full items-center pb-8"}>
                <div className="flex flex-row">
                    <button onClick={this.prevExpression}>Prev</button>
                    <button onClick={this.nextExpression}>Next</button>
                </div>
                <ExpressionSolver expression={expressionsList[this.state.selected]} key={this.state.selected}/>
            </div>
        );
    }
}