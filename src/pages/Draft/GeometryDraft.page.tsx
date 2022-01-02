import React from 'react';
import { Triangle as TriangleI } from "../../generator/geometry";
import { Polygon } from "../../math";

import { randomTriangle, randomTriangleLength } from '../../generator/geometry/triangles';

export default class GeometryDraftPage extends React.PureComponent {
    triangle!: TriangleI;

    state = {
        triangle: randomTriangle().triangle,
    }

    constructor(props: any) {
        super(props);
    }

    triangleToSvgPoints = (triangle: TriangleI) => {
        const { vectors } = triangle;
        const size_adjust = 100 / vectors[0].magnitude();

        return new Polygon(vectors)
            .scale(size_adjust)
            .adjustX(100)
            .adjustY(100)
            .toString();
    };

    newTriangle = () => {
        this.setState({ triangle: randomTriangle().triangle });
    }

    testFunction = () => {
        const lengths = randomTriangleLength();
        console.log("length", lengths);
    }

    render() {

        const trianglePoints = this.triangleToSvgPoints(this.state.triangle);

        return (
            <div className={"flex flex-col f1 w-full h-full items-center"}>
                <svg
                    style={{ maxWidth: 400, maxHeight: 400, borderWidth: 1, borderStyle: "solid" }}
                    viewBox="0 0 400 400"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polygon points={trianglePoints} stroke="black" fill="blue" strokeWidth={1}/>
                </svg>
                <button onClick={this.newTriangle}>New triangle</button>
                <button onClick={this.testFunction}>Test function</button>
            </div>
        );
    }
}