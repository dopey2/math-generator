import React from 'react';
import GraphGridComponent from "./GraphGrid.component";
import VectorComponent from "./Vector.component";


interface VectorProps {
    x: number,
    y: number,
    label?: string,
    color?: string
}

interface Props {
    width?: number;
    height?: number;
    units?: number;
    hideUnits?: boolean;
    unitsInterval?: number;
    vectors?: VectorProps[]
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

    toPoint = (x: number) => x * this.units

    render() {
        return (
            <svg
                style={{width: this.width, height: this.height}}
                viewBox={`0 0 ${this.width} ${this.height}`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <GraphGridComponent
                    width={this.width}
                    height={this.height}
                    units={this.units}
                    hideUnits={this.props.hideUnits}
                />

                {this.props.vectors && this.props.vectors.length && this.props.vectors.map((v) => (
                    <VectorComponent
                        x1={this.width / 2}
                        y1={this.height / 2}
                        x2={v.x}
                        y2={v.y}
                        units={this.units}
                        label={v.label}
                        color={v.color}
                        origin={{x: this.width /2, y: this.height / 2}}
                    />
                    ))}

            </svg>
        );
    }
};

