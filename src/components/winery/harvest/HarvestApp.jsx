import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import HarvestList from "./HarvestList";
import {AuthContext} from "../../platform/AuthContext";
import HarvestForm from "./HarvestForm";
import HarvestInfo from "./HarvestInfo";
import HarvestProvider from "./HarvestContext";
import WineProvider from "../wine/WineContext";

class HarvestApp extends Component {

    static contextType = AuthContext;

    render()
    {
        const {principal} = this.context;
        return (
                <>
                    <HarvestProvider>
                        <WineProvider>
                            <Switch>
                                <Route exact path="/mv/harvest">
                                    <Redirect to="/mv/harvest/all"/>
                                </Route>
                                <Route exact path="/mv/harvest/all" component={HarvestList}/>
                                <Route exact path="/mv/harvest/:status?" component={HarvestList}/>
                                <Route exact path="/mv/harvest/e/:harvestId?">
                                    <HarvestForm principal={principal}/>
                                </Route>
                                <Route path="/mv/harvest/info/:harvestId?">
                                    <HarvestInfo principal={principal}/>
                                </Route>
                            </Switch>
                        </WineProvider>
                    </HarvestProvider>
                </>

        );
    }
}

export default HarvestApp;
