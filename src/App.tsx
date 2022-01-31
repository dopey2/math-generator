import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import DraftOperationPage from "./pages/Draft/DraftOperationPage";
import SelectExercise from "./pages/SelectExercice/SelectExercise";
import TestParser from "./pages/TestParser/TestParser";

const App: React.FC<any> = () => {


    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/select/:id">
                        <SelectExercise/>
                    </Route>

                    <Route path="/draftOperation/:id">
                        <DraftOperationPage/>
                    </Route>

                    <Route path="/testParser">
                        <TestParser/>
                    </Route>

                    <Route path="/">
                        <a href="/draftOperation/0">Operation Draft</a>
                        <a href="/testParser">Test parser</a>
                        <a href="/select/0">Select</a>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
