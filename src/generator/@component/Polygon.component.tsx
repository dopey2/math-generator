import React, {useCallback} from 'react';
import Polygon from '../../math/Geometry/Polygon/Polygon';
import Vector2 from '../../math/Vector2';

const x_adjust = 50;
const y_adjust = 50;

function arrayRotate(arr: Array<any>) {
    arr.push(arr.shift());
    return arr;
}

interface Props {
    polygon: Polygon
}

export default class PolygonComponent extends React.PureComponent<Props> {

    state = {
        angle: 0,
    }

    render() {
        const polygon = this.props.polygon.scaleToFit(200, 200).adjustToFit().rotate(this.state.angle);
        const centroind = polygon.getCentroid();

        return (
            <div>

                {/* @ts-ignore */}
                <label htmlFor="angle">Angle </label>
                <input id="angle" value={this.state.angle} type={"number"}
                       onChange={(ev) => this.setState({angle: ev.target.value})}></input>

                <svg
                    style={{width: 400, height: 400}}
                    viewBox="0 0 400 400"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polygon points={polygon.toString()} stroke="black" fill="white" strokeWidth={1}/>
                    <circle cx={centroind[0]} cy={centroind[1]} r="3"/>
                </svg>
            </div>
        );
    }
};
