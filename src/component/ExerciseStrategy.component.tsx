import React from "react";
import { VisualRepresentationI } from "../generator/ExerciseBuilder";
import KatexComponent from "./Katex.component";

interface Props {
    visualRepresentation: VisualRepresentationI;
}

// @ts-ignore
const ExerciseStrategy: React.FC<Props> = (props) => {

    if (props.visualRepresentation.type === "latex" && props.visualRepresentation.latex) {
        return (
            <KatexComponent tex={props.visualRepresentation.latex} />
        );
    }

    if (props.visualRepresentation.type === "html" && props.visualRepresentation.html) {
        return props.visualRepresentation.html;
    }

    if (props.visualRepresentation.type === "custom" && props.visualRepresentation.custom) {
        const C = props.visualRepresentation.custom.component;
        return <C {...props.visualRepresentation.custom.props} />;
    }

    return null;
};

export default ExerciseStrategy;