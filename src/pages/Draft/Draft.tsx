import React from "react";
import { withRouter } from "react-router-dom";
import { ExerciseI } from "../../generator/ExerciseBuilder";
import VenDiagramComponent, { VenDiagramEnum } from "../../generator/@component/VenDiagram/VenDiagram.component";


interface State {
  exerciseName: string;
  exercise: ExerciseI | null;
  refreshKey: number;
}

class Draft extends React.PureComponent<null, State> {

    render() {
        return (
            <div className={styles.content}>
                <div className={styles.contentContainer}>
                    <VenDiagramComponent type={VenDiagramEnum.A_inter_B} />
                </div>
            </div>
        );
    }
}

// @ts-ignore
export default withRouter(Draft);

const styles = {
    content: "flex flex-1 overflow-y-hidden",
    contentContainer: "flex flex-col flex-1 p-8 overflow-y-scroll",
};

