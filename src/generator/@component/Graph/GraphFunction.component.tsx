import React from 'react';

interface Props {
  function: (x: number) => number;
  units: number;
  color?: string;
  origin: { x: number, y: number }
}

export default class GraphFunctionComponent extends React.PureComponent<Props> {
    get color() {
        return this.props.color || "#000";
    }


  toPointX = (k: number) => this.props.origin.x + k * this.props.units;
  toPointY = (k: number) => this.props.origin.y - k * this.props.units;


  getPoints = () => {
      let points: {x1: number, y1: number, x2: number, y2: number}[] = [];

      for(let i = -9; i <= 10; i++) {

          const point = {
              x1: i - 1,
              y1: this.props.function(i - 1),
              x2: i,
              y2: this.props.function(i),
          };

          points.push(point);
      }

      return points;
  }

  render() {
      const points = this.getPoints();

      return (
          <>
              {points.map((p, i) => (
                  <line
                      key={i}
                      x1={this.toPointX(p.x1)}
                      y1={this.toPointY(p.y1)}
                      x2={this.toPointX(p.x2)}
                      y2={this.toPointY(p.y2)}
                      stroke={this.color}
                      strokeWidth="1.5"
                  />
              ))}
          </>
      );
  }
}
