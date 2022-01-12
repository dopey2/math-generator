import MathX from "../../math/MathX/MathX";
import ExerciseBuilder from "../ExerciseBuilder";
import PolygonComponent from "../@component/Polygon/Polygon.component";
import Square from "../../math/Geometry/Square/Square";

export const getSquareArea = () => {
    const side = MathX.random(2, 10);

    const expression = `Soit le carré ABCD avec AB = ${side}`;
    const square = new Square(side);

    const props = {
        polygon: square.toPolygon(),
        verticesLabel: [
            { name: "A", show: true },
            { name: "B", show: true },
            { name: "C", show: true },
            { name: "D", show: true }
        ],
        edgesLabel: [
            { name: `${side}`, show: true },
            { name: `${side}`, show: true },
            { name: `${side}`, show: true },
            { name: `${side}`, show: true }
        ],
    };

    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addCustomQuestion(PolygonComponent, props)
        .addCustomAnswer(PolygonComponent, props)
        .addAnswerHtml(square.getArea())
        .toJSON();
};