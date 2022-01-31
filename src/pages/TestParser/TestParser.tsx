import React from 'react';
import { withRouter } from "react-router-dom";

import ExpressionSolver from '../Draft/ExpressionSolver.component';
import MathObj from "../../math/Operation/MathObj/MathObj";
import { parse } from "../../math/Operation/parser";

interface State {
  expression: string;
  mathObj?: MathObj | null;
  key: number;
}

class TestParser extends React.PureComponent<any, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            expression: "",
            key: 0,
        };
    }

    onChangeExpression = (ev: any) => {
        this.setState({ expression: ev.target.value.trim() });
    }

    onClickCompile = () => {
        this.setState({ mathObj: parse(this.state.expression), key: Date.now() });
    }

    render() {
        return (

            <div className={"flex flex-col f1 w-full h-full items-center pb-8 pt-8"}>

                <div className={"flex flex-col"}>
                    <input className={"border-2"} type="text" value={this.state.expression} onChange={this.onChangeExpression}/>
                    <button onClick={this.onClickCompile}>submit</button>
                </div>

                {this.state.mathObj && (
                    <ExpressionSolver expression={this.state.mathObj} key={this.state.key} />
                )}
            </div>

        );
    }
}

// @ts-ignore
export default withRouter(TestParser);

