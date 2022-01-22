import React from 'react';
import KatexComponent from '../../component/Katex.component';
import MathObj from '../../math/Operation/MathObj/MathObj';

interface Props {
    expression: MathObj;
}

interface State {
    lastStep: any;
    steps: any;
}

export default class ExpressionSolver extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            lastStep: props.expression,
            steps: [props.expression.toTex()],
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
        const steps = this.props.expression.solveAllToTex();
        this.setState({steps});
    };

    render() {
        return (
            <div className="flex flex-col">
                {this.state.steps.map((s: string, i: number) => {
                    return <KatexComponent tex={s} key={i}/>;
                })}

                <button onClick={this.solveNext}>Test function</button>
                <button onClick={this.solveAll}>Solve all</button>
            </div>
        )
    }
}