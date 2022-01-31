import React from 'react';

import { expressionsList } from "./expressionsList";
import ExpressionSolver from './ExpressionSolver.component';
import clsx from "clsx";
import { Link, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

interface State {
    selected: number
}

class DraftOperationPage extends React.PureComponent<any, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            selected: 0,
        };
    }

    componentDidUpdate(prevProps: Readonly<RouteComponentProps<{ id: string }>>) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({ selected: this.props.match.params.id });
        }
    }

    render() {
        return (

            <div className="flex flex-1 w-full h-full">

                <div className={styles.navMenu}>
                    <ul>
                        {expressionsList.map((ex, i) => (
                            <li
                                key={i}
                                className={clsx({
                                    [styles.navItemSelected]: i === parseInt(this.props.match.params.id),
                                    [styles.navItem]: true,
                                })}>
                                <Link to={`/draftOperation/${i}`}>{i} expression</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className={"flex flex-col f1 w-full h-full items-center pb-8"}>
                    <ExpressionSolver expression={expressionsList[this.state.selected]} key={this.state.selected}/>
                </div>
            </div>

        );
    }
}


// @ts-ignore
export default withRouter(DraftOperationPage);

const styles = {
    pageContainer: "flex flex-1 w-full h-full",
    navMenu: "flex shrink-0 flex-col w-96 h-full border-r-2 border-grey-300 pl-4 pr-4 pt-4 pb-4 overflow-y-scroll no-scrollbar",
    navItem: "pl-4 pr-4 pt-2 pb-2",
    navItemSelected: "bg-green-300 text-white rounded-md",
};
