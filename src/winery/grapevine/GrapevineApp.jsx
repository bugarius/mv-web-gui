import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {AuthContext} from "../../platform/AuthContext";
import GrapevineForm from "./GrapevineForm";
import GrapevineList from "./GrapevineList";
import GrapevineProvider from "./GrapevineContext";

class GrapevineApp extends Component {

    static contextType = AuthContext;

    render()
    {
        const {principal} = this.context;
        return (
                <>
                    <GrapevineProvider>
                        <Switch>
                            <Route exact path="/mv/grapevine">
                                <Redirect to="/mv/grapevine/all"/>
                            </Route>
                            <Route exact path="/mv/grapevine/all" component={GrapevineList}/>
                            <Route path="/mv/grapevine/:grapevineId?">
                                <GrapevineForm  principal={principal}/>
                            </Route>
                        </Switch>
                    </GrapevineProvider>
                </>

        );
    }
}

export default GrapevineApp;
