import Polygon from "../Polygon/Polygon";


export default class Square {
    side: number;

    constructor(side: number) {
        this.side = side;
    }

    getArea = () => {
        return this.side * this.side;
    };

    getPerimeter = () => {
        return this.side * 4;
    };

    getDiagonal = () => {
        return this.side * Math.sqrt(2);
    };

    toPolygon = () => {
        return new Polygon([
            [0, 0],
            [this.side, 0],
            [this.side, this.side],
            [0, this.side]
        ]);
    }
}