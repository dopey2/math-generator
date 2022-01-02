import React from 'react';

interface Props {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    units: number
    label?: string;
    color?: string;
    origin: { x: number, y: number }
}

export default class VectorComponent extends React.PureComponent<Props> {

    get color() {
        return this.props.color || "#000";
    }

    toPoint = (x: number) => x * this.props.units

    render() {
        return (
            <>
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="6"
                        markerHeight="4"
                        refX="0"
                        refY="2"
                        orient="auto"
                    >
                        <polygon points="0 0, 6 2, 0 4"/>
                    </marker>
                </defs>
                <line
                    x1={this.toPoint(this.props.x1)}
                    y1={this.toPoint(this.props.y1)}
                    x2={this.toPoint(this.props.x2)}
                    y2={this.toPoint(this.props.y2)}
                    stroke={this.color}
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                />
            </>
        )
    }
}