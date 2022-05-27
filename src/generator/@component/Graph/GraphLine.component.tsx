import React from 'react';
import Line from "../../../math/Line/Line";

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
  static id = 0;
  private _id = 0;

  get color() {
      return this.props.color || "#000";
  }

  constructor(props: Props) {
      super(props);
      this._id = VectorComponent.id;
      VectorComponent.id += 1;
  }

  getLabelCoordinates = () => {

      const { x1, y1, x2, y2 } = this.props;

      const line = new Line(x1, y1, x2, y2);
      const fixMargin = 0.3;
      const fixX = x1 > 0 ? x1 + fixMargin : x1 - fixMargin * 2;
      const lineY = line.getY(x1) || y1;
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
              <line
                  x1={this.toPointX(this.props.x1)}
                  y1={this.toPointY(this.props.y1)}
                  x2={this.toPointX(this.props.x2)}
                  y2={this.toPointY(this.props.y2)}
                  stroke={this.color}
                  strokeWidth="1.5"
              />

              {this.props.label && (
                  <text {...this.getLabelCoordinates()} stroke={this.color}>{this.props.label}</text>
              )}
          </>
      );
  }
}
