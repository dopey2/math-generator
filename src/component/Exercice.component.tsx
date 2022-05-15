import React, { useCallback, useState } from 'react';
import { ExerciseI } from "../generator/ExerciseBuilder";
import ExerciseStrategy from "./ExerciseStrategy.component";


interface Props {
    title: string;
    exercise: Array<ExerciseI>;
}

const ExerciseComponent: React.FC<Props> = (props) => {

    const [showResult, setShowResult] = useState(0);

    const onClickShowResult = useCallback(() => {
        setShowResult(1);
    }, []);

    const onClickShowSteps = useCallback(() => {
        setShowResult(2);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.topRow}>
                <span>{props.title}</span>
                <div>
                    {props.exercise[0].stepAnswer && props.exercise[0].stepAnswer.length && (
                        <button
                            onClick={onClickShowSteps}
                            className={styles.buttonShowSteps}>Steps</button>
                    )}
                    <button
                        onClick={onClickShowResult}
                        className={styles.buttonShowResult}>Show result
                    </button>
                </div>

            </div>

            <div className={"inline-block pl-4 pr-24 overflow-x-scroll"}>
                {props.exercise.map((exercise, i) => {
                    return (
                        <div style={{ minHeight: 55 }} className={"items-start border-0 border-b"} key={i}>


                            {!(showResult !== 0 && exercise.inlineAnswer) && (
                                exercise.question.map((q, i) => (
                                    <ExerciseStrategy key={i} visualRepresentation={q} />
                                ))
                            )}

                            {showResult === 1 && (
                                <>
                                    {exercise.answer.map((answ, i) => (
                                        <ExerciseStrategy key={i} visualRepresentation={answ} />
                                    ))}
                                </>
                            )}

                            {showResult === 2 && exercise.stepAnswer && (
                                <>
                                    {exercise.stepAnswer.map((step, i) => (
                                        <ExerciseStrategy key={i} visualRepresentation={step} />
                                    ))}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const styles = {
    buttonShowSteps: `
        bg-green-300
        text-white 
        h-8 pl-4 
        pr-4 
        rounded-md
        border
        border-solid
        border-green-300
        hover:bg-white
        hover:text-green-300
        hover: border-white
        hover:border-green-300 
   `,
    buttonShowResult: `
        ml-4    
        bg-green-300
        text-white 
        h-8 pl-4 
        pr-4 
        rounded-md
        border
        border-solid
        border-green-300
        hover:bg-white
        hover:text-green-300
        hover: border-white
        hover:border-green-300 
    `,
    container: "flex flex-1 flex-col w-full shadow-md rounded-md overflow-hidden",
    topRow: "bg-gray-100 h-12 pl-4 pr-4 flex items-center justify-between",
};

export default ExerciseComponent;
