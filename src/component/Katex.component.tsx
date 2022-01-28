import React from "react";
import katex from "katex";
import 'katex/dist/katex.min.css';

interface Props {
    tex: string;
}

export default class KatexComponent extends React.PureComponent<Props> {
    ref: any;

    componentDidMount(): void {
        if(this.ref) {
            katex.render(this.props.tex, this.ref, { displayMode: true });
        }
    }

    render() {
        return (
            <div className="flex flex-1 w-full" ref={(ref) => this.ref = ref}></div>
        );
    }
}