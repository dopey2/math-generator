import React, {useCallback} from 'react';
import Polygon from '../../math/Geometry/Polygon/Polygon';
import Vector2 from '../../math/Vector2';

import {Triangle as TriangleI} from "../geometry";

const x_adjust = 50;
const y_adjust = 50;

function arrayRotate(arr: Array<any>) {
    arr.push(arr.shift());
    return arr;
}

const getPositionForLabel = (points: TriangleI['points'], labels: string[]) => {
    const arr: { vector: Vector2, fixVector: Vector2, label: string }[] = [];

    let _points = [...points];

    for (let i = 0; i < 3; i++) {
        let [point1, point2, point3] = _points;
        const vectorA = new Vector2({...point1});
        const vectorB = new Vector2({...point2});
        const vectorC = new Vector2({...point3});
        const coordsBC = vectorB.add(vectorC).scalar(1 / 2);
        // Opposite position of coordsBC relative to A
        const vectorD = vectorA.add(vectorA.subtract(coordsBC));
        // Distance from A to D
        const vectorE = vectorD.subtract(vectorA);
        const desiredDistanceFromPoint = 20;
        const divisor = vectorE.magnitude() / desiredDistanceFromPoint;

        let fixX = vectorE.x / divisor;
        let fixY = vectorE.y / divisor;

        if (vectorD.x < vectorA.x && labels[i].length > 1) {
            fixX -= (labels[i].length - 1) * 6;
        }

        const fixVector = new Vector2(fixX, fixY);

        arr.push({
            vector: vectorA,
            fixVector,
            label: labels[i],
        });

        arrayRotate(_points);
    }

    return arr;
};

interface Props {
    triangle: TriangleI
}

export default class TriangleComponent extends React.PureComponent<Props> {


    squareSvgPoints = (triangle: TriangleI) => {
        const {AB, points} = triangle;
        const size_adjust = 100 / AB;

        const s = 10;

        return `
        ${x_adjust} ${points[1].y * size_adjust + y_adjust},
        ${x_adjust + s} ${points[1].y * size_adjust + y_adjust},
        ${x_adjust + s} ${points[1].y * size_adjust + y_adjust - s},
        ${x_adjust} ${points[1].y * size_adjust + y_adjust - s},
        ${x_adjust} ${points[1].y * size_adjust + y_adjust}
        `;
    };


    triangleTextToSvgPoints = (triangle: TriangleI) => {
        const {AB, BC, AC, points} = triangle;
        const size_adjust = 100 / AB;

        const vectorAB = new Vector2({...points[0]}).add({...points[1]});
        const vectorBC = new Vector2({...points[1]}).add({...points[2]});
        const vectorAC = new Vector2({...points[2]}).add({...points[0]});

        const lengthPoints = [
            {...vectorAB.scalar(1 / 2).xy},
            {...vectorBC.scalar(1 / 2).xy},
            {...vectorAC.scalar(1 / 2).xy}
        ];

        const positionForLabels = getPositionForLabel(points, ['A', 'B', 'C']);
        const positionForLength = getPositionForLabel(lengthPoints, [
            AB.toString(),
            BC.toString(),
            AC.toString()
        ]).filter((p, i) => triangle.knowSide.includes(i));


        return [
            ...[...positionForLabels, ...positionForLength].map((p) => {
                p.vector.adjustX = (x) => x * size_adjust + x_adjust + p.fixVector.x;
                p.vector.adjustY = (y) => y * size_adjust + y_adjust + p.fixVector.y;

                return {
                    ...p.vector.xy,
                    label: p.label,
                };
            })
        ];
    };

    triangleToSvgPoints = (triangle: TriangleI) => {
        const {vectors} = triangle;
        const size_adjust = 100 / vectors[0].magnitude();

        return new Polygon(vectors)
            .scale(size_adjust)
            .adjustX(x_adjust)
            .adjustY(y_adjust)
            .toString();
    };


    render() {
        const trianglePoints = this.triangleToSvgPoints(this.props.triangle)
        const squarePoints = this.squareSvgPoints(this.props.triangle)
        const textsCoordinates = this.triangleTextToSvgPoints(this.props.triangle);

        return (
            <svg
                style={{maxWidth: 400, maxHeight: 200}}
                viewBox="0 0 400 200"
                xmlns="http://www.w3.org/2000/svg"
            >
                <polygon points={trianglePoints} stroke="black" fill="white" strokeWidth={1}/>
                <polygon points={squarePoints} stroke="black" fill="white" strokeWidth={1}/>

                {textsCoordinates.map((text, i) => (
                    (text.label
                        && <text
                            key={i}
                            x={text.x}
                            y={text.y}
                            fontFamily="Verdana"
                            fontSize="15"
                        >
                            {text.label}
                        </text>)
                ))}
            </svg>
        );
    }
};
