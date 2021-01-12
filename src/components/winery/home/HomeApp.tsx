import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import WineProvider from "../wine/WineContext";
import {HomePage} from "./HomePage";

export const HomeApp = () => {
    return (
        <WineProvider>
            <Switch>
                <Route exact path="/mv">
                    <Redirect to="/mv/start"/>
                </Route>
                <Route exact path="/mv/start" component={HomePage}/>
            </Switch>
        </WineProvider>
    )
};