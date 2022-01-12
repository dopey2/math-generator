import React from 'react';
import Polygon from '../../../math/Geometry/Polygon/Polygon';
import MathX from "../../../math/MathX/MathX";
import Line from "../../../math/Line/Line";

interface Props {
  polygon: Polygon;
  verticesLabel?: {name: string, show: boolean, color?: string}[];
  edgesLabel?: {name: string, show: boolean, color?: string}[];
}

export default class PolygonComponent extends React.PureComponent<Props> {

    polygon!: Polygon;

    constructor(props: Props) {
        super(props);

        this.state = {
            angle: MathX.random(0, 360),
        };

        this.initLocalPolygon();
    }

    initLocalPolygon = () => {
        this.polygon = this.props.polygon.scaleToFit(150, 150)
            .adjustToFit()
            // .rotate(MathX.random(0, 360))
            .adjustX(30) // fix for labels
            .adjustY(30); // fix for labels
    };

    componentDidUpdate(prevProps: Readonly<Props>) {
        if(prevProps.polygon !== this.props.polygon) {
            this.initLocalPolygon();
        }
    }


    computePositionForText = (x: number, y: number, anchorX: number, anchorY: number, margin = 10) => {
        const line = new Line(x, y, anchorX, anchorY);

        const polar = MathX.cartesianToPolar(x - anchorX, y - anchorY);
        const sin = Math.sin(MathX.degToRadian(polar[1])); // for y
        const cos = Math.cos(MathX.degToRadian(polar[1])); // for x

        const fixX = x + (cos * margin);
        let lineY = line.getY(x) || y;

        if(lineY > anchorY) { // text anchor is at the bottom middle, and height = 23;
            lineY += 23 / 2;
        }

        let fixY = lineY + (sin * margin);

        return [fixX, fixY];
    };

    getVerticesLabel = () => {
        if(!this.props.verticesLabel || this.props.verticesLabel.length !== this.polygon.points.length) {
            return [];
        }

        const labels: {x: number, y: number, name: string}[] = [];
        const [cX, cY] = this.polygon.getCentroid();

        this.polygon.points.forEach((p, i) => {
            const [x, y] = p;
            const [fixedX, fixedY] = this.computePositionForText(x, y, cX, cY);
            const label = { x: fixedX, y: fixedY, name: "" };

            if(this.props.verticesLabel && this.props.verticesLabel[i] && this.props.verticesLabel[i].show) {
                label.name = this.props.verticesLabel[i].name;
                labels.push(label);
            }
        });

        return labels;
    };

    getEdgesLabel = () => {
        const [cX, cY] = this.polygon.getCentroid();
        const midpoints = this.polygon.getEdgesMidpoint();
        const labels: {x: number, y: number, name: string}[] = [];

        midpoints.forEach((mp, i) => {
            const [x, y] = mp;
            const [fixedX, fixedY] = this.computePositionForText(x, y, cX, cY, 15);
            const label = { x: fixedX, y: fixedY, name: "" };

            if(this.props.edgesLabel && this.props.edgesLabel[i] && this.props.edgesLabel[i].show) {
                label.name = this.props.edgesLabel[i].name;
                labels.push(label);
            }
        });

        return labels;
    };


    render() {
        const verticesLabel = this.getVerticesLabel();
        const edgesLabel = this.getEdgesLabel();

        return (
            <div>
                <svg
                    style={{ width: 250, height: 250 }}
                    viewBox="0 0 250 250"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polygon points={this.polygon.toString()} stroke="black" fill="white" strokeWidth={1}/>

                    <style>{`
                        .vertices-label {
                            font-weight: 600;
                            font-family: Computer Modern;
                        } 
                        .edges-label {
                            font-weight: 600;
                            font-family: Computer Modern;
                        }
                    `}</style>

                    {verticesLabel.map((label, i) => (
                        <text
                            key={i}
                            x={label.x}
                            y={label.y}
                            className="vertices-label"
                            textAnchor="middle"
                        >{label.name}</text>
                    ))}
                    {edgesLabel.map((label, i) => (
                        <text
                            key={i}
                            x={label.x}
                            y={label.y}

                            className="edges-label"
                            textAnchor="middle"
                        >{label.name}</text>
                    ))}
                </svg>
            </div>
        );
    }
};
