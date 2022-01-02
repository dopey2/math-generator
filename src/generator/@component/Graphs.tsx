import React from 'react';
import GraphGrid from "./GraphGrid";

interface Props {
    width?: number;
    height?: number;
    units?: number;
    hideUnits?: number;
    unitsInterval?: number;
}

export default class Graphs extends React.PureComponent<Props> {

    get width() {
        return this.props.width !== undefined ? this.props.width : 400;
    }

    get height() {
        return this.props.height !== undefined ? this.props.height : 400;
    }

    get units() {
        return this.props.units !== undefined ? this.props.units : 20;
    }

    render() {
        return (
            <svg
                style={{ width: 400, height: 400 }}
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
            >
                <GraphGrid width={400} height={400} units={20}/>
            </svg>
        );
    }
};

