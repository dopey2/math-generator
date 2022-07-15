import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import SelectExercise from "./pages/SelectExercice/SelectExercise";
import Draft from "./pages/Draft/Draft";
import Navbar from "./component/Navbar/Navbar";

const App: React.FC<any> = () => {


    return (
        <div className="w-full h-full flex flex-1 flex-col">
            <Navbar />

            <Router>
                <Switch>

                    <Route path="/select/:category/:id">
                        <SelectExercise/>
                    </Route>

                    <Route path="/select/:id">
                        <SelectExercise/>
                    </Route>

                    <Route path="/draft">
                        <Draft/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
