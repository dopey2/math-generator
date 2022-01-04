import React from 'react';

interface Props {
    width: number;
    height: number;
    units: number;
    hideUnits?: boolean;
    unitsInterval?: number;
}

export default class GraphGrid extends React.PureComponent<Props> {

    renderRows = () => {
        const rows = [];

        for (let i = 0; i < this.props.height; i += this.props.units) {
            rows.push(<line key={i} x1={0} y1={i} x2={this.props.width} y2={i} stroke="lightgrey" strokeWidth={0.5}/>);
        }

        return rows;
    }

    renderCols = () => {
        const cols = [];

        for (let i = 0; i < this.props.width; i += this.props.units) {
            cols.push(<line key={i} x1={i} y1={0} x2={i} y2={this.props.height} stroke="lightgrey" strokeWidth={0.5}/>);
        }

        return cols;
    }

    renderUnit = () => {

        if (this.props.hideUnits) {
            return null;
        }

        const units = [];

        const xStep = this.props.width / this.props.units;
        let x = -(xStep / 2);

        for (let i = 0; i <= this.props.width; i += this.props.units, x += 1) {
            if (x === 0) {
                continue;
            }

            if(this.props.unitsInterval !== undefined && x % this.props.unitsInterval !== 0) {
                continue;
            }

            units.push(<line
                key={`h-${i}`}
                x1={i}
                y1={this.props.height / 2 - 2}
                x2={i}
                y2={this.props.height / 2 + 2}
                stroke="black"
                strokeWidth={0.5}
            />);

            let textY = this.props.height / 2 + (this.props.units * 0.8);
            if (x < 0) {
                textY = this.props.height / 2 - (this.props.units * 0.4);
            }

            units.push(<text
                key={`h-t-${i}`}
                x={i - this.props.units * 0.2}
                y={textY}
                className="graph-grid-units"
            >{x}</text>);
        }

        const yStep = this.props.height / this.props.units;
        let y = yStep / 2;

        for (let i = 0; i <= this.props.height; i += this.props.units, y -= 1) {
            if (y === 0) {
                continue;
            }

            if(this.props.unitsInterval !== undefined && y % this.props.unitsInterval !== 0) {
                continue;
            }

            units.push(<line
                key={`v-${i}`}
                x1={this.props.width / 2 - 2}
                y1={i}
                x2={this.props.width / 2 + 2}
                y2={i}
                stroke="black"
                strokeWidth={0.5}
            />);


            let textX = this.props.height / 2 + (this.props.units * 0.4);
            if (y < 0) {
                textX = this.props.height / 2 - (this.props.units * 0.8);
            }

            units.push(<text
                key={`v-t-${i}`}
                x={textX}
                y={i + this.props.units * 0.2}
                className="graph-grid-units"
            >{y}</text>);


        }

        return units;
    }

    render() {
        return (
            <>
                {this.renderRows()}
                {this.renderCols()}

                <style>
                    {`.graph-grid-units { font: italic 10px sans-serif; }`}
                </style>

                <line
                    x1={0}
                    y1={this.props.height / 2}
                    x2={this.props.width}
                    y2={this.props.height / 2}
                    stroke="black"
                    strokeWidth={1}
                />
                <line
                    x1={this.props.width / 2}
                    y1={0}
                    x2={this.props.width / 2}
                    y2={this.props.height}
                    stroke="black"
                    strokeWidth={1}
                />

                {this.renderUnit()}

            </>
        );
    }
}