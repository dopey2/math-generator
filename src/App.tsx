import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import GeometryDraftPage from "./pages/Draft/GeometryDraft.page";
import DraftOperationPage from "./pages/Draft/DraftOperationPage";
import SelectExercise from "./pages/SelectExercice/SelectExercise";

const App: React.FC<any> = () => {


    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/select/:id">
                        <SelectExercise/>
                    </Route>

                    <Route path="/geometryDraft">
                        <GeometryDraftPage/>
                    </Route>

                    <Route path="/draftOperation">
                        <DraftOperationPage/>
                    </Route>

                    <Route path="/">
                        <a href="/generator">Generator</a>
                        <a href="/geometryDraft">Geometry Draft</a>
                        <a href="/draftOperation">Operation Draft</a>
                        <a href="/select/0">Select</a>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
