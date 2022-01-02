export interface Coordinates2D {
    x: number;
    y: number;
}

export interface Vector2I extends Coordinates2D {
    add: (v: Vector2I) => Vector2I;
    subtract: (v: Vector2I) => Vector2I;
    scalar: (k: number) => Vector2I;
}

export default class Vector2 implements Vector2I {
    private _x!: number;
    private _y!: number;

    /**
     * Override these global function if you need to rescale, use margins etc...
     * */
    public adjustX?: (x: number) => number;
    public adjustY?: (y: number) => number;

    get x() {
        if (this.adjustX) {
            return this.adjustX(this._x);
        }
        return this._x;
    }

    get y() {
        if (this.adjustY) {
            return this.adjustY(this._y);
        }
        return this._y;
    }

    get xy() {
        return {
            x: this.x,
            y: this.y,
        };
    }

    constructor(x: number, y: number);
    constructor(vector: Coordinates2D);
    constructor(...args: any) {
        if (args && typeof args[0] === 'number' && typeof args[1] === 'number') {
            this._x = args[0];
            this._y = args[1];
        } else if (args && args[0] && typeof args[0].x === 'number' && typeof args[0].y === 'number') {
            this._x = args[0].x;
            this._y = args[0].y;
        } else {
            throw Error('Vector wrong params');
        }

        return this;
    }

    add = (vector: Coordinates2D) => {
        return new Vector2(this._x + vector.x, this._y + vector.y);
    };

    subtract = (vector: Vector2I) => {
        return new Vector2(this._x - vector.x, this._y - vector.y);
    };

    scalar = (k: number) => {
        return new Vector2(this._x * k, this._y * k);
    };

    magnitude = () => {
        return Math.hypot(this.x, this.y);
    }
}
