import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import HarvestList from "./HarvestList";
import {AuthContext} from "../../platform/AuthContext";
import HarvestForm from "./HarvestForm";
import HarvestInfo from "./HarvestInfo";
import HarvestProvider from "./HarvestContext";

class HarvestApp extends Component {

    static contextType = AuthContext;

    render()
    {
        const {principal} = this.context;
        return (
                <>
                    <HarvestProvider>
                        <Switch>
                            <Route exact path="/mv/harvest">
                                <Redirect to="/mv/harvest/all"/>
                            </Route>
                            <Route exact path="/mv/harvest/all" component={HarvestList}/>
                            <Route exact path="/mv/harvest/:harvestId?">
                                <HarvestForm  principal={principal}/>
                            </Route>
                            <Route path="/mv/harvest/:harvestId?/info">
                                <HarvestInfo  principal={principal}/>
                            </Route>
                        </Switch>
                    </HarvestProvider>
                </>

        );
    }
}

export default HarvestApp;
