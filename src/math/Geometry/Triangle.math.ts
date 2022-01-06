import Circle from "../Circle";
import MathX from "../MathX/MathX";

type TriangleMathParams = {
  lengths?: number[];

}

export class Triangle {

  constructor(params: TriangleMathParams) {
    if (params.lengths && params.lengths.length === 3) {
      const [AB, BC, AC] = params.lengths;

      const circle1 = new Circle(0, 0, AC);
      const circle2 = new Circle(AB, 0, BC);
      const intersections = Circle.intersection(circle1, circle2);
      const intersection = MathX.random(0, 1) ? intersections[0] : intersections[1];

      const points = [
        {x: 0, y: 0, label: 'A'},
        {x: AB, y: 0, label: 'B'},
        {x: intersection.x, y: intersection.y, label: 'C'}
      ];
    }
  }

  static withSize = (AB: number, BC: number, AC: number) => {
    return new Triangle({lengths: [AB, BC, AC]});
  }
}