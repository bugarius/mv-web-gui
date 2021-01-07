import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {AuthContext} from "../../platform/AuthContext";
import TankProvider from "./TankContext";
import TankList from "./TankList";
import {TankForm} from "./TankForm";

const TankApp = () => {

    const {principal} = useContext(AuthContext);
    return (
            <TankProvider>
                <Switch>
                    <Route exact path="/mv/tank">
                        <Redirect to="/mv/tank/all"/>
                    </Route>
                    <Route exact path="/mv/tank/all" component={TankList}/>
                    <Route exact path="/mv/tank/:tankId">
                        <TankForm principal={principal}/>
                    </Route>
                    <Route path="/mv/tank/:tankId/info">

                    </Route>
                </Switch>
            </TankProvider>

    );
}

export default TankApp;
