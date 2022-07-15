import React from 'react';

export const VenDiagramEnum = {
    A_inter_B: "A_inter_B",
    A_inter_C: "A_inter_C",
    C_inter_B: "C_inter_B",
    A_inter_B_inter_C: "A_inter_B_inter_C",
};

interface Props {
  width?: number;
  height?: number;
  type: string;
}

export default class VenDiagramComponent extends React.PureComponent<Props> {

    get width() {
        return this.props.width !== undefined ? this.props.width : 400;
    }

    get height() {
        return this.props.height !== undefined ? this.props.height : 400;
    }

    getIntersection() {

        const { type } = this.props;


        return (
            <>
                <clipPath id="A">
                    <circle cx="60" cy="60" r="50" stroke="black" strokeWidth="2" fill="transparent" />
                </clipPath>

                <clipPath id="B">
                    <circle cx="120" cy="60" r="50" stroke="black" strokeWidth="2" fill="transparent" />
                </clipPath>

                <clipPath id="A_inter_B">
                    <circle clipPath="url('#A')" cx="120" cy="60" r="50" stroke="black" strokeWidth="2" fill="transparent" />
                </clipPath>

                <clipPath id="A_inter_B_inter_C">
                    <circle clipPath="url('#A_inter_B')" cx="90" cy="110" r="50" stroke="black" strokeWidth="2" fill="transparent" />
                </clipPath>

                <clipPath id="A_inter_C">
                    <circle clipPath="url('#A')" cx="90" cy="110" r="50" stroke="black" strokeWidth="2" fill="transparent" />
                </clipPath>

                <clipPath id={this.props.type}>
                    <circle clipPath="url('#B')" cx="90" cy="110" r="50" stroke="black" strokeWidth="2" fill="transparent" />
                </clipPath>

                <circle
                    clipPath="url('#A_inter_B')"
                    cx="0"
                    cy="60"
                    r="150"
                    fill="#8080ff"
                    stroke="#000080"
                />

                <circle cx="60" cy="60" r="50" stroke="black" strokeWidth="2" fill="transparent" />
                <circle cx="120" cy="60" r="50" stroke="black" strokeWidth="2" fill="transparent" />
                <circle cx="90" cy="110" r="50" stroke="black" strokeWidth="2" fill="transparent" />
            </>
        );

    }

    render() {
        return (
            <div>
                <svg
                    style={{ width: this.width, height: this.height }}
                    viewBox={`0 0 ${this.width} ${this.height}`}
                    xmlns="http://www.w3.org/2000/svg"
                >

                    {this.getIntersection()}
                </svg>
            </div>
        );
    }
};

