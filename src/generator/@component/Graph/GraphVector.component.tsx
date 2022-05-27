import React from 'react';
import Line from "../../../math/Line/Line";

interface Props {
    x: number;
    y: number;
    units: number
    label?: string;
    color?: string;
    origin: { x: number, y: number }
}

export default class GraphVectorComponent extends React.PureComponent<Props> {
    static id = 0;
    private _id = 0;

    get color() {
        return this.props.color || "#000";
    }

    constructor(props: Props) {
        super(props);
        this._id = GraphVectorComponent.id;
        GraphVectorComponent.id += 1;
    }

    getLabelCoordinates = () => {
        const line = new Line(0, 0, this.props.x, this.props.y);
        const fixMargin = 0.3;
        const fixX = this.props.x > 0 ? this.props.x + fixMargin : this.props.x - fixMargin * 2;
        const lineY = line.getY(this.props.x) || this.props.y;
        const fixY = lineY > 0 ? lineY + fixMargin : lineY - fixMargin * 2;

        return {
            x: this.toPointX(fixX),
            y: this.toPointY(fixY),
        };
    };

    toPointX = (k: number) => this.props.origin.x + k * this.props.units;
    toPointY = (k: number) => this.props.origin.y - k * this.props.units;

    render() {
        return (
            <>
                <defs>
                    <marker
                        id={`arrowhead-${this._id}`}
                        markerWidth="6"
                        markerHeight="4"
                        refX="5.5"
                        refY="2"
                        orient="auto"
                    >
                        <polygon fill={this.color} points="0 0, 6 2, 0 4"/>
                    </marker>
                </defs>
                <line
                    x1={this.toPointX(0)}
                    y1={this.toPointY(0)}
                    x2={this.toPointX(this.props.x)}
                    y2={this.toPointY(this.props.y)}
                    stroke={this.color}
                    strokeWidth="1.5"
                    markerEnd={`url(#arrowhead-${this._id})`}
                />

                <text {...this.getLabelCoordinates()} stroke={this.color}>{this.props.label}</text>
            </>
        );
    }
}
