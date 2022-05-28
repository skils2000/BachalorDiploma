import React from 'react';
import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom'
import './App.scss';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import PlanPage from "./Pages/Plan/PlanPage";
import FieldsPage from "./Pages/Fields/FieldsPage";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import FactPage from "./Pages/Fact/FactPage";
import SettingsPage from "./Pages/Settings/SettingsPage";
import GolfTurfScouting from "./Pages/GolfTurfScouting/GolfTurfScouting";


const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path={'/'} exact>
                        <MainLayout link={'/'}>
                            <PlanPage />
                        </MainLayout>
                    </Route>
                    <Route path={'/gtf'} exact>
                        <MainLayout link={'/gtf'}>
                            <GolfTurfScouting />
                        </MainLayout>
                    </Route>
                    <Route path={'/fact-works'} exact>
                        <MainLayout link={'/fact-works'}>
                            <FactPage />
                        </MainLayout>
                    </Route>
                    <Route path={'/fields'} exact>
                        <MainLayout link={'/fields'}>
                            <FieldsPage />
                        </MainLayout>
                    </Route>
                    <Route path={'/settings'} exact>
                        <MainLayout link={'/settings'}>
                            <SettingsPage />
                        </MainLayout>
                    </Route>
                    <Redirect to={'/'} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
