import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {AuthContext} from "../../platform/AuthContext";
import WineList from "./WineList";
import WineForm from "./WineForm";
import WineInfo from "./WineInfo";
import WineProvider from "./WineContext";
import IngredientProvider from "../ingredient/IngredientContext";
import ProductionEventProvider from "../production_event/ProductionEventContext";
import {AppliedIngredientForm} from "../ingredient/applied/AppliedIngrediendForm";
import {ProductionEventForm} from "../production_event/ProductionEventForm";

class WineApp extends Component {

    static contextType = AuthContext;

    render()
    {
        const {principal} = this.context;
        return (
                <>
                    <WineProvider>
                        <IngredientProvider>
                            <ProductionEventProvider>
                                <Switch>
                                    <Route exact path="/mv/wine">
                                        <Redirect to="/mv/wine/all"/>
                                    </Route>
                                    <Route exact path="/mv/wine/all" component={WineList}/>
                                    <Route exact path="/mv/wine/:status?" component={WineList}/>
                                    <Route exact path="/mv/wine/e/:wineId?">
                                        <WineForm principal={principal}/>
                                    </Route>
                                    <Route exact path="/mv/wine/info/:wineId?">
                                        <WineInfo principal={principal}/>
                                    </Route>
                                    <Route exact path="/mv/wine/info/:wineId?/:harvestId?">
                                        <WineForm principal={principal}/>
                                    </Route>
                                    <Route exact path="/mv/wine/ingredient/:wineId?/:appliedIngredientId?">
                                        <AppliedIngredientForm />
                                    </Route>
                                    <Route exact path="/mv/wine/event/:wineId?/:productionEventId?">
                                        <ProductionEventForm />
                                    </Route>
                                </Switch>
                            </ProductionEventProvider>
                        </IngredientProvider>
                    </WineProvider>
                </>

        );
    }
}

export default WineApp;
