import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import WineProvider from "../wine/WineContext";
import {BoardPage} from "./HomePage";

export const BoardApp = () => {
    return (
        <WineProvider>
            <Switch>
                <Route exact path="/mv">
                    <Redirect to="/mv/board"/>
                </Route>
                <Route exact path="/mv/board" component={BoardPage}/>
            </Switch>
        </WineProvider>
    )
};