import ExerciseBuilder from "../ExerciseBuilder";
import VenDiagramComponent from "../@component/VenDiagram/VenDiagram.component";


export const venDiagram1 = () => {
    const expression = `Diagram de ven`;

    return new ExerciseBuilder()
        .addQuestionHtml(expression)
        .addCustomQuestion(VenDiagramComponent, { type: "A_inter_B" })
        .addAnswerLatex("TEs")
        .toJSON();
};
