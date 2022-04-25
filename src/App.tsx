import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import DraftOperationPage from "./pages/Draft/DraftOperationPage";
import SelectExercise from "./pages/SelectExercice/SelectExercise";
import TestParser from "./pages/TestParser/TestParser";
import Navbar from "./component/Navbar/Navbar";

const App: React.FC<any> = () => {


    return (
        <div className="w-full h-full flex flex-1 flex-col">
            <Navbar />

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
                </Switch>
            </Router>
        </div>
    );
};

export default App;
