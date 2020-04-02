import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Error500 from "../components/Pages/Error500";

const ErrorApp = () => {

    return (
            <Switch>
                <Route exact path="/mv/error">
                    <Redirect to="/mv/error/500"/>
                </Route>
                <Route exact path="/mv/error/500" component={Error500}/>
            </Switch>
    );
};

export default ErrorApp;
