import React from "react";
import * as MathJax from "@nteract/mathjax";
import { VisualRepresentationI } from "../generator/ExerciseBuilder";
import TriangleComponent from "./Triangle.component";

interface Props {
    visualRepresentation: VisualRepresentationI;
}

// @ts-ignore
const ExerciseStrategy: React.FC<Props> = (props) => {

    if (props.visualRepresentation.type === "latex" && props.visualRepresentation.latex) {
        return (
            <MathJax.Provider
                options={{
                    "CommonHTML": { linebreaks: { automatic: true } },
                    "SVG": { linebreaks: { automatic: true } },
                    "HTML-CSS": { linebreaks: { automatic: true } },
                }}
            >
                <MathJax.Node>{props.visualRepresentation.latex}</MathJax.Node>
            </MathJax.Provider>
        );
    }

    if (props.visualRepresentation.type === "html" && props.visualRepresentation.html) {
        return props.visualRepresentation.html;
    }

    if (props.visualRepresentation.type === "canvas" && props.visualRepresentation.canvas) {
        return (
            <TriangleComponent
                triangle={props.visualRepresentation.canvas}
            />
        );
    }

    if (props.visualRepresentation.type === "custom" && props.visualRepresentation.custom) {
        const C = props.visualRepresentation.custom.component;
        return <C {...props.visualRepresentation.custom.props} />;
    }

    return null;
};

export default ExerciseStrategy;