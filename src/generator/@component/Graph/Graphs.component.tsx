import React from 'react';
import GraphGridComponent from "./GraphGrid.component";
import GraphVectorComponent from "./GraphVector.component";
import GraphPoints2DComponent from "./GraphPoints2D.component";
import GraphLineComponent from "./GraphLine.component";
import GraphFunctionComponent from "./GraphFunction.component";


interface PointsProps {
    x: number;
    y: number;
    label?: string;
    color?: string;
}

interface VectorProps {
    x: number;
    y: number;
    label?: string;
    color?: string;
}

interface LineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    label?: string;
    color?: string;
}

interface Props {
    width?: number;
    height?: number;
    units?: number;
    hideUnits?: boolean;
    unitsInterval?: number;
    functions?: Array<(x: number) => number>
    lines?: LineProps[];
    points?: PointsProps[];
    vectors?: VectorProps[];
}

export default class GraphsComponent extends React.PureComponent<Props> {

    get width() {
        return this.props.width !== undefined ? this.props.width : 400;
    }

    get height() {
        return this.props.height !== undefined ? this.props.height : 400;
    }

    get units() {
        return this.props.units !== undefined ? this.props.units : 20;
    }

    get unitsInterval() {
        return this.props.unitsInterval !== undefined ? this.props.unitsInterval : 1;
    }

    render() {
        return (
            <div style={{ width: this.width, height: this.height, position: "relative" }}>

                <div className="absolute h-full w-4  bg-gradient-to-r from-white to-transparent"/>
                <div className="absolute right-0 h-full w-4  bg-gradient-to-l from-white to-transparent"/>
                <div className="absolute h-4 w-full  bg-gradient-to-b from-white to-transparent"/>
                <div className="absolute bottom-0 h-4 w-full  bg-gradient-to-t from-white to-transparent"/>

                <svg
                    style={{ width: this.width, height: this.height }}
                    viewBox={`0 0 ${this.width} ${this.height}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <GraphGridComponent
                        width={this.width}
                        height={this.height}
                        units={this.units}
                        unitsInterval={this.unitsInterval}
                        hideUnits={this.props.hideUnits}
                    />

                    {this.props.functions && this.props.functions.map((f, i) => (
                        <GraphFunctionComponent
                            key={i}
                            function={f}
                            units={this.units}
                            origin={{ x: this.width / 2, y: this.height / 2 }}
                        />
                    ))}

                    {this.props.lines && this.props.lines.map((l, i) => (
                        <GraphLineComponent
                            key={i}
                            {...l}
                            units={this.units}
                            origin={{ x: this.width / 2, y: this.height / 2 }}
                        />
                    ))}

                    {this.props.points && this.props.points.map((p, i) => (
                        <GraphPoints2DComponent
                            key={i}
                            {...p}
                            units={this.units}
                            origin={{ x: this.width / 2, y: this.height / 2 }}
                        />
                    ))}

                    {this.props.vectors && this.props.vectors.length && this.props.vectors.map((v, i) => (
                        <GraphVectorComponent
                            key={i}
                            {...v}
                            units={this.units}
                            origin={{ x: this.width / 2, y: this.height / 2 }}
                        />
                    ))}
                </svg>
            </div>
        );
    }
};

