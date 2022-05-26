import React from 'react';

interface Props {
  x: number;
  y: number;
  label?: string;
  color?: string;
  origin: {
    x: number;
    y: number;
  };
  units: number;
}

export default class Points2DComponent extends React.PureComponent<Props> {

    get color() {
        return this.props.color || "#000";
    }

    toPointX = (k: number) => this.props.origin.x + k * this.props.units;
    toPointY = (k: number) => this.props.origin.y - k * this.props.units;

    render() {
        return (
            <>
                <circle
                    cx={this.toPointX(this.props.x)}
                    cy={this.toPointY(this.props.y)}
                    r={3}
                    fill={this.color}
                />
                <text
                    x={this.toPointX(this.props.x) - 5}
                    y={this.toPointY(this.props.y) - 12}
                    stroke={this.color}
                >
                    {this.props.label}
                </text>
            </>
        );
    }
}
