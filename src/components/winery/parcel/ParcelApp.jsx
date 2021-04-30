import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import ParcelList from "./ParcelList";
import {AuthContext} from "../../platform/AuthContext";
import {ParcelForm} from "./ParcelForm";
import ParcelProvider from "./ParcelContext";

class ParcelApp extends Component {

    static contextType = AuthContext;

    render()
    {
        const {principal} = this.context;
        return (
                <>
                    <ParcelProvider>
                        <Switch>
                            <Route exact path="/mv/parcel">
                                <Redirect to="/mv/parcel/all"/>
                            </Route>
                            <Route exact path="/mv/parcel/all" component={ParcelList}/>
                            <Route exact path="/mv/parcel/:status?" component={ParcelList}/>
                            <Route exact path="/mv/parcel/e/:parcelId">
                                <ParcelForm  principal={principal}/>
                            </Route>
                            <Route path="/mv/parcel/info/:parcelId">

                            </Route>
                        </Switch>
                    </ParcelProvider>
                </>

        );
    }
}

export default ParcelApp;
