import React from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { get } from 'lodash';
import { ExerciseI } from "../../generator/ExerciseBuilder";
import ExerciseComponent from "../../component/Exercice.component";
import Drawer, { DrawerItem } from "../../component/Drawer/Drawer";
import { CategoryMap, exerciseList, getExerciseByCat } from "./exerciseMapping";


interface State {
    exerciseName: string;
    exercise: ExerciseI | null;
    refreshKey: number;
}

class SelectExercise extends React.PureComponent<RouteComponentProps<{ id: string, category?: string }>, State> {


    constructor(props: any) {
        super(props);

        const state: any = {
            exerciseName: '',
            exercise: null,
            refreshKey: 0,
        };

        const pathId = this.props.match.params.id;
        const key = parseInt(pathId);
        const exercise = exerciseList[key];

        if (key && exercise) {
            state.exercise = exercise.fun();
            state.exerciseName = exercise.label;
        }

        this.state = state;
    }

    componentDidMount() {
        this.generateExercise();
    }

    componentDidUpdate(prevProps: Readonly<RouteComponentProps<{ id: string }>>) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.generateExercise();
        }
    }

    generateExercise = () => {
        const exercisesByCat = getExerciseByCat();

        const path = this.props.location.pathname;
        const catsKeys = path.split("/").filter((c) => {
            return !!c && c !== "select";
        });

        const exercise = get(exercisesByCat, catsKeys);

        if (exercise) {
            this.setState((prevState) => ({
                exerciseName: exercise.label,
                exercise: exercise.fun(),
                refreshKey: prevState.refreshKey + 1,
            }));
        }
    };

    getDrawerItems(exercisesByCat: any, parentPath: string) {
        const exercises: DrawerItem[] = [];

        Object.entries(exercisesByCat).forEach(([key, value]) => {
            const cat = CategoryMap[key];

            const drawerItem: DrawerItem = {
                label: cat.label,
                path: `${parentPath}/${cat.id}`,
                items: [],
                isSelected: `${parentPath}/${cat.id}` === this.props.location.pathname,
            };

            if(Array.isArray(value)) {
                value.forEach((exercise, i) => {

                    const path = `/${parentPath}/${cat.id}/${i}`;

                    if(drawerItem.items) {
                        drawerItem.items.push({
                            label: exercise.label,
                            path,
                            isSelected: path === this.props.location.pathname,
                        });
                    }
                });

                exercises.push(drawerItem);
            } else {
                const item = this.getDrawerItems(value, `${parentPath}/${key}`) as any;

                if(drawerItem.items) {
                    drawerItem.items.push(...item);
                }

                exercises.push(drawerItem);
            }
        });

        return exercises;
    }

    render() {
        const drawerItems = this.getDrawerItems(getExerciseByCat(), "select") as any;

        return (
            <div className={styles.content}>

                <Drawer items={drawerItems} />

                <div className={styles.contentContainer}>
                    <button onClick={this.generateExercise}>new</button>

                    <div className={styles.exerciseContainer}>
                        {this.state.exercise && (
                            <ExerciseComponent
                                key={this.state.refreshKey}
                                title={this.state.exerciseName}
                                exercise={[this.state.exercise]}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

// @ts-ignore
export default withRouter(SelectExercise);

const styles = {
    content: "flex flex-1 overflow-y-hidden",
    contentContainer: "flex flex-col flex-1 p-8 overflow-y-scroll",
    exerciseContainer: "mt-8 flex-1 w-full",
};

